import { TodoList } from "@/domain/entities/TodoList";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { ITodoListUseCases } from "@/domain/useCases/todoListUseCases";

export class RemoteTodoListUseCases implements ITodoListUseCases {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async getTodoList(): Promise<TodoList> {
    const httpResponse = await this.httpClient.request({
      url: this.url + "/todos",
      method: "GET",
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const { todos } = httpResponse.data;
        const todoList = new TodoList(todos);

        return todoList;

      default:
        throw new Error("Unexpected status code: " + httpResponse.statusCode);
    }
  }
  async addTodo(todo: any): Promise<any> {
    const httpResponse = await this.httpClient.request({
      url: this.url + "/todos",
      method: "POST",
      body: todo,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return httpResponse.data;

      default:
        throw new Error("Unexpected status code: " + httpResponse.statusCode);
    }
  }
  async removeTodo(todoId: string): Promise<any> {
    const httpResponse = await this.httpClient.request({
      url: this.url + `/todos/${todoId}`,
      method: "DELETE",
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.data;

      default:
        throw new Error("Unexpected status code: " + httpResponse.statusCode);
    }
  }
  async updateTodo(item: any): Promise<any> {
    const httpResponse = await this.httpClient.request({
      url: this.url + `/todos/${item.id}`,
      method: "PUT",
      body: item,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.data;

      default:
        throw new Error("Unexpected status code: " + httpResponse.statusCode);
    }
  }
}
