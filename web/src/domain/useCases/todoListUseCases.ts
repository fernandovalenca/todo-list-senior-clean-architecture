import { TodoList } from "@/domain/entities/TodoList";

export interface ITodoListUseCases {
  getTodoList(): Promise<TodoList>;
  addTodo(todo: any): Promise<void>;
  updateTodo(todo: any): Promise<void>;
  removeTodo(todoId: string): Promise<void>;
}
