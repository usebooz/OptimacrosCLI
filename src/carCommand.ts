import { ApiCommand } from "./apiCommand";
import { Args, Command } from "@oclif/core";

export abstract class CarCommand<
  T extends typeof Command
> extends ApiCommand<T> {
  static args = {
    id: Args.string({
      name: "id",
      description: "Car ID",
      required: true,
    }),
  };
  static examples = [
    `<%= config.bin %> <%= command.id %> 644cad1355f7d66c05e63d6c`,
  ];
}
