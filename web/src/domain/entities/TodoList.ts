import { Observable } from "@/domain/entities/Observable";
import { Todo } from "@/domain/entities/Todo";

export class TodoList extends Observable {
  todos: Todo[];

  constructor(todos?: any[]) {
    super();
    this.todos = [];

    if (todos) {
      for (const todo of todos) {
        this.todos.push({
          id: todo.id,
          description: todo.description,
          done: todo.done,
        });
      }
    }
  }

  async addTodo(description: string) {
    if (!description) return;
    if (this.todos.filter((item) => !item.done).length > 4) return;
    if (this.todos.some((item) => item.description === description)) return;

    const todo = new Todo(description);

    this.todos.push(todo);

    this.notify("addTodo", todo);
  }

  async deleteTodo(todoId: string) {
    const todo = this.todos.find((todo) => todo.id === todoId);

    if (!todo) return;

    this.todos.splice(this.todos.indexOf(todo), 1);

    this.notify("deleteTodo", todo.id);
  }

  async updateTodo(todoId: string) {
    const todo = this.todos.find((todo) => todo.id === todoId);

    if (!todo) return;

    this.todos = this.todos.map((todo) =>
      todo.id === todoId ? { ...todo, done: !todo.done } : todo
    );

    this.notify("updateTodo", todo);
  }

  async getTodoByDescription(description: string): Promise<any> {
    return this.todos.find((todo) => todo.description === description);
  }

  async completed() {
    const totalTasksCompleted = this.todos.filter((todo) => todo.done).length;
    const messageCompleted =
      totalTasksCompleted > 0
        ? `${totalTasksCompleted} de ${this.todos.length}`
        : 0;

    return {
      totalTasksCompleted,
      messageCompleted,
    };
  }
}
