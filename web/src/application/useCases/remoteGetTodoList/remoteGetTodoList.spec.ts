import { HttpClientSpy } from "@/application/tests/httpClientSpy";
import { RemoteGetTodoList } from "./remoteGetTodoList";

type SutTypes = {
  sut: RemoteGetTodoList;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url = "@any_url"): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteGetTodoList(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteGetTodoList", () => {
  test("Should call HttpClient with correct URL", async () => {
    const url = "@other_url";
    const { sut, httpClientSpy } = makeSut(url);

    await sut.execute();

    expect(httpClientSpy.url).toBe(url);
  });
  test("Should call HttpClient with correct method", async () => {
    const url = "@other_url";
    const { sut, httpClientSpy } = makeSut(url);

    await sut.execute();

    expect(httpClientSpy.method).toBe('GET');
  });
});
