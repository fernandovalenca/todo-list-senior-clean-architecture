import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from "@/application/protocols/http";

import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({ baseURL: "base_url" });

export class AxiosHttpClientAdapter implements HttpClient {
  async request(data: HttpRequest<any, any>): Promise<HttpResponse<any>> {
    try {
      const axiosResponse = await axios.request({
        headers: data.headers,
        baseURL: data.url,
        url: data.url,
        method: data.method,
        data: data.body,
      });

      return {
        statusCode: axiosResponse.status,
        data: axiosResponse.data,
      };
    } catch (error: any) {
      const axiosResponseError = error.response as AxiosResponse;

      return {
        statusCode: axiosResponseError.status,
        data: axiosResponseError.data,
      };
    }
  }
}
