import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "@/application/protocols/http";

export class HttpClientSpy implements HttpClient {
  url?: string;
  method?: string;
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok,
  };

  async request(params: HttpRequest): Promise<HttpResponse> {
    this.url = params.url;
    this.method = params.method;

    return this.response;
  }
}
