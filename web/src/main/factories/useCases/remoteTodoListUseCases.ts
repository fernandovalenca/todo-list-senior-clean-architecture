import { RemoteTodoListUseCases } from "@/data/useCases/remoteTodoListUseCase";
import { axiosHttpClientAdapter } from "@/main/factories/protocols/http/axiosHttpClient";

export const useCaseTodoListFactory = () => {
  const useCaseTodoList = new RemoteTodoListUseCases(
    axiosHttpClientAdapter,
    "http://localhost:3000"
  );

  return {
    useCaseTodoList,
  };
};
