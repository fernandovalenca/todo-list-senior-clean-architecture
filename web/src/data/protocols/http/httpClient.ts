export type httpMethod = "GET" | "POST" | "PUT" | "DELETE";

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  serverError = 500,
}

export type HttpRequest<HeadersType = any, BodyType = any> = {
  url: string;
  method: httpMethod;
  headers?: HeadersType;
  body?: BodyType;
};

export type HttpResponse<DataType = any> = {
  statusCode: number;
  data: DataType;
};
  
export interface HttpClient<
  RequestHeadersType = any,
  RequestBodyType = any,
  ResponseDataType = any
> {
  request: (
    data: HttpRequest<RequestHeadersType, RequestBodyType>
  ) => Promise<HttpResponse<ResponseDataType>>;
}
