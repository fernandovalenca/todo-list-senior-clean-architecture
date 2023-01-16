import { TodoList } from "@/domain/entities/TodoList";

export interface IGetTodoList {
  execute(): Promise<TodoList>;
}
