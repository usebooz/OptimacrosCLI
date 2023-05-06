import { ApiCommand } from "../../apiCommand";

export default class Login extends ApiCommand<typeof Login> {
  static description = "Login to Optimacros API.";

  async run(): Promise<void> {
    const user = await this.promptUser();

    this.showSpinner("Logging in");
    const response = await this.apiClient.login(null, user);
    this.hideSpinner();

    this.apiToken = response.data.token;
  }
}
