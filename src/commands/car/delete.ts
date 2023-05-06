import { CarCommand } from "../../carCommand";

export default class CarDelete extends CarCommand<typeof CarDelete> {
  static description = "Delete a car by ID.";

  async run(): Promise<void> {
    this.showSpinner("Deleting car");
    await this.apiClient.deleteCarById(this.args.id, null, {
      headers: this.authHeader,
    });
    this.hideSpinner();
  }
}
