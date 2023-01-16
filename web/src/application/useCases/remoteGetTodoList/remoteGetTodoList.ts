import { HttpClient } from "@/application/protocols/http";

export class RemoteGetTodoList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async execute(): Promise<void> {
    const httpResponse = await this.httpClient.request({
      method: "GET",
      url: this.url,
    });

    Promise.resolve();
  }
}
