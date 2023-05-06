import { ApiCommand } from "../../apiCommand";
import { Components } from "../../types/openapi";

export default class Cars extends ApiCommand<typeof Cars> {
  static description = "Get cars by filter and sort.";

  static examples = [
    {
      description: "Using without flags",
      command: "<%= config.bin %> <%= command.id %>",
    },
    {
      description: "Using with filter",
      command: `<%= config.bin %> <%= command.id %> --filter="brand=Ford"`,
    },
    {
      description: "Using with sort",
      command: `<%= config.bin %> <%= command.id %> --sort=model,-year`,
    },
    {
      description: "Using with filter and sort",
      command: `<%= config.bin %> <%= command.id %> --filter="model=Mustang" --sort=-price`,
    },
  ];

  static flags = {
    ...ApiCommand.tableFlags,
  };

  async run(): Promise<void> {
    const filter: Components.Parameters.CarFilter = {};
    if (this.flags.filter?.includes("=")) {
      const [field, value] = this.flags.filter.split("=");
      filter[field] = value;
    }
    const sort: Components.Parameters.CarSort = this.flags.sort
      ? this.flags.sort.split(",")
      : [];

    this.showSpinner("Fetching cars");
    const cars = await this.apiClient.getCars(
      { filter: filter, sort: sort },
      undefined,
      { headers: this.authHeader }
    );
    this.hideSpinner();

    this.showCars(cars.data);
  }
}
