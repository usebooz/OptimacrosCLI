import { CarCommand } from "../../carCommand";

export default class CarUpdate extends CarCommand<typeof CarUpdate> {
  static description = "Update a car by ID.";

  async run(): Promise<void> {
    this.showSpinner("Fetching car");
    let response = await this.apiClient.getCarById(this.args.id, null, {
      headers: this.authHeader,
    });
    this.hideSpinner();

    const car = await this.promptCar(response.data);

    this.showSpinner("Updating car");
    response = await this.apiClient.updateCarById(this.args.id, car, {
      headers: this.authHeader,
    });
    this.hideSpinner();

    this.showCars([response.data]);
  }
}
