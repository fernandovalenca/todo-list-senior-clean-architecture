import { ChangeEvent, FormEvent, useState } from "react";

import { useAppContext } from "@/presentation/context/AppContext";
import { CreateButton, Input, Task } from "@/presentation/components";

import styles from "./styles.module.css";
import { TodoListComponent } from "@/presentation/components/TodoListComponent";

export function Home() {
  const {
    state: { todoList },
  } = useAppContext();
  const [description, setDescription] = useState("");

  function onChangeInputDescription(event: ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    todoList.addTodo(description);
    setDescription("");
  }

  const EmptyTodoListComponent = (
    <div className={styles.emptinessMessage}>
      <img src="/clipboard.svg" alt="clipboard" title="clipboard" />
      <p>
        Você ainda não tem tarefas cadastradas Crie tarefas e organize seus
        itens a fazer
      </p>
    </div>
  );

  const descriptionIsEmpty = description.length === 0;

  const totalTasksCompleted = todoList.todos.filter(
    (item: any) => item.done
  ).length;
  const messageCompleted =
    totalTasksCompleted > 0
      ? `${totalTasksCompleted} de ${todoList.todos.length}`
      : 0;

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <section className={styles.sectionAddNewTask}>
          <form onSubmit={onSubmit} role={"form"}>
            <Input
              placeholder="Adicione uma nova tarefa"
              value={description}
              onChange={onChangeInputDescription}
              autoFocus
              role={"textbox"}
            />
            <CreateButton
              type="submit"
              disabled={descriptionIsEmpty}
              role={"button"}
            />
          </form>
        </section>
        <section className={styles.sectionTasks}>
          <header>
            <strong className={styles.createdTasksLabel}>
              Tarefas criadas <span>{todoList.todos.length}</span>
            </strong>
            <strong className={styles.completedTasksLabel}>
              Concluídas <span>{messageCompleted}</span>
            </strong>
          </header>
          <div className={styles.listTasks}>
            {todoList.todos.length === 0
              ? EmptyTodoListComponent
              : TodoListComponent({ todoList })}
          </div>
        </section>
      </div>
    </main>
  );
}
