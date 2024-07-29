import { Trash, Check } from "phosphor-react";
import styles from "./styles.module.css";
import { Todo } from "@/domain/entities/Todo";
import { HTMLAttributes } from "react";

type TodoProps = {
  data: Todo;
  onDeleteTask: (id: string) => void;
  onCheckedTask: (id: string) => void;
} & HTMLAttributes<HTMLLIElement>;

export function Task({
  data,
  onCheckedTask,
  onDeleteTask,
  ...rest
}: TodoProps) {
  function handleDeleteTask() {
    onDeleteTask(data.id!);
  }

  function handleCheckedTask() {
    onCheckedTask(data.id!);
  }

  const taskButtonClass = data.done
    ? styles.checkedButton
    : styles.unCheckedButton;
  const taskButtonTitle = data.done ? "Desmarcar" : "Marcar";

  return (
    <li className={styles.container} {...rest}>
      <button
        data-testId="todo-toggle-button"
        type="button"
        className={taskButtonClass}
        onClick={handleCheckedTask}
        title={taskButtonTitle}
      >
        <div className={styles.containerIcon}>
          <Check size={18} weight="bold" />
        </div>
        <p>{data.description}</p>
      </button>
      <button
        data-testId="todo-delete-button"
        type="button"
        className={styles.deleteButton}
        onClick={handleDeleteTask}
        title="Deletar tarefa"
      >
        <Trash size={18} weight="bold" />
      </button>
    </li>
  );
}
