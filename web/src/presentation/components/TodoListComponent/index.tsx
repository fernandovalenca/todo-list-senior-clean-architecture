import { TodoList } from "@/domain/entities/TodoList";
import { Task } from "../Task";

import styles from "./styles.module.css";

type TodoListComponentProps = {
  todoList: TodoList;
};

export const TodoListComponent = ({ todoList }: TodoListComponentProps) => {
  function deleteItem(itemId: string) {
    todoList.deleteTodo(itemId);
  }

  function updateItem(itemId: string) {
    todoList.updateTodo(itemId);
  }

  return (
    <ul className={styles.list} role={"list"}>
      {todoList.todos.map((todo) => (
        <Task
          data-testId={todo.description}
          key={todo.id}
          data={todo}
          onDeleteTask={deleteItem}
          onCheckedTask={updateItem}
        />
      ))}
    </ul>
  );
};
