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
      {todoList.todos.map((item: any) => (
        <Task
          key={item.id}
          data={item}
          onDeleteTask={deleteItem}
          onCheckedTask={updateItem}
        />
      ))}
    </ul>
  );
};
