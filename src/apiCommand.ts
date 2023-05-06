import { Command, Config, Interfaces, ux } from "@oclif/core";
import { AxiosResponse, OpenAPIClientAxios } from "openapi-client-axios";
import Conf from "conf";

import { Components, OptimacrosAPIClient } from "./types/openapi.js";

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<
  (typeof ApiCommand)["baseFlags"] & T["flags"]
>;
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T["args"]>;

export abstract class ApiCommand<T extends typeof Command> extends Command {
  public static tableFlags = ux.table.flags();
  public static examples: typeof Command.examples = [
    `<%= config.bin %> <%= command.id %>`,
  ];

  private _api: OpenAPIClientAxios;
  private _conf: Conf<Record<string, string>>;
  private _ux: typeof ux;

  protected flags!: Flags<T>;
  protected args!: Args<T>;

  public apiClient!: OptimacrosAPIClient;

  public get apiToken(): string {
    return this._conf.get("token");
  }

  public set apiToken(token: string) {
    this._conf.set("token", token);
  }

  public get authHeader() {
    return { Authorization: `Bearer ${this.apiToken}` };
  }

  public constructor(argv: string[], config: Config) {
    super(argv, config);

    this._ux = ux;
    this._api = new OpenAPIClientAxios({
      definition: process.env.OPENAPI_DOC_URL || "",
    });
    this._conf = new Conf({ projectName: "optimacros" });
  }

  public async init(): Promise<void> {
    await super.init();

    const { args, flags } = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof ApiCommand).baseFlags,
      args: this.ctor.args,
      strict: this.ctor.strict,
    });
    this.flags = flags as Flags<T>;
    this.args = args as Args<T>;

    this.apiClient = await this._api.getClient<OptimacrosAPIClient>();
  }

  protected async catch(
    err: Error & { exitCode?: number } & {
      response: AxiosResponse<
        Components.Schemas.Error & {
          path: string;
        },
        never
      >;
    }
  ): Promise<void> {
    const message = err.response ? err.response.data.message : err.message;
    if (this.isSpinnerRunning()) {
      this.hideSpinner(message);
    } else {
      this.log(message);
    }
  }

  public showSpinner(message: string): void {
    this._ux.action.start(message);
  }

  public hideSpinner(msg?: string): void {
    this._ux.action.stop(msg);
  }

  public isSpinnerRunning(): boolean {
    return this._ux.action.running;
  }

  public async promptUser(): Promise<Components.Schemas.User> {
    const username = await this._ux.prompt("Enter username");
    const password = await this._ux.prompt("Enter password", { type: "hide" });
    return { username, password };
  }

  public async promptCar(
    car: Components.Schemas.Car = {
      brand: "",
      model: "",
      year: 0,
      color: "",
      price: 0,
    }
  ): Promise<Components.Schemas.Car> {
    const carNew = { ...car };
    for (const [carField, oldValue] of Object.entries(carNew)) {
      if (carField[0] === "_") continue;
      const newValue = await this._ux.prompt(`Enter ${carField}`, {
        default: oldValue ? oldValue.toString() : undefined,
      });
      carNew[carField] =
        typeof oldValue === "number" ? Number(newValue) : newValue;
    }
    return carNew;
  }

  public showCars(cars: Components.Schemas.Car[]): void {
    this._ux.table(
      cars,
      Object.keys(cars[0]).reduce<Record<string, object>>(
        (columns, carField) => {
          columns[carField] = { extended: carField.includes("_v") };
          return columns;
        },
        {}
      )
    );
  }
}
