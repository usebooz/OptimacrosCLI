import { ApiCommand } from "../../apiCommand";

export default class CarsCreate extends ApiCommand<typeof CarsCreate> {
  static description = "Create a new car.";

  async run(): Promise<void> {
    const car = await this.promptCar();

    this.showSpinner("Creating car");
    const response = await this.apiClient.createCar(null, car, {
      headers: this.authHeader,
    });
    this.hideSpinner();

    this.showCars([response.data]);
  }
}
