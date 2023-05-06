import { CarCommand } from "../../carCommand";

export default class Car extends CarCommand<typeof Car> {
  static description = "Get a car by ID.";

  async run(): Promise<void> {
    this.showSpinner("Fetching car");
    const response = await this.apiClient.getCarById(this.args.id, null, {
      headers: this.authHeader,
    });
    this.hideSpinner();

    this.showCars([response.data]);
  }
}
