import { ApiCommand } from "../../apiCommand";

export default class Logout extends ApiCommand<typeof Logout> {
  static description = "Logout from Optimacros API.";

  async run(): Promise<void> {
    this.apiToken = "";
    this.log("Logged out");
  }
}
