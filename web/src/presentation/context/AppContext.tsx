import { TodoList } from "@/domain/entities/TodoList";
import { Observer } from "@/domain/entities/Observer";
import { ITodoListUseCases } from "@/domain/useCases/todoListUseCases";

import { createContext, useContext, useEffect, useState } from "react";

export type AppContextProvider = {
  children: React.ReactNode;
  useCaseTodoList: ITodoListUseCases;
};

export type StatePropsType = {
  todoList: TodoList;
};

export type AppContextData = {
  state: StatePropsType;
};

export const INITIAL_CONTEXT = {
  state: {
    todoList: new TodoList(),
  },
} as AppContextData;

const AppContext = createContext<AppContextData>(INITIAL_CONTEXT);

export const AppContextProvider = ({
  children,
  useCaseTodoList,
}: AppContextProvider) => {
  const [state, setContext] = useState<StatePropsType>(INITIAL_CONTEXT.state);

  useEffect(() => {
    (async () => {
      const todos = await useCaseTodoList.getTodoList();

      todos.register(
        new Observer("addTodo", async (todo: any) => {
          await useCaseTodoList.addTodo(todo);

          setContext((prevState) => ({
            ...prevState,
            todoList: todos,
          }));
        })
      );

      todos.register(
        new Observer("updateTodo", async (todo: string) => {
          await useCaseTodoList.updateTodo(todo);

          setContext((prevState) => ({
            ...prevState,
            todoList: todos,
          }));
        })
      );

      todos.register(
        new Observer("deleteTodo", async (todoId: string) => {
          await useCaseTodoList.removeTodo(todoId);

          setContext((prevState) => ({
            ...prevState,
            todoList: todos,
          }));
        })
      );

      setContext((prevState) => ({
        ...prevState,
        todoList: todos,
      }));
    })();
  }, []);

  return (
    <AppContext.Provider value={{ state }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context)
    throw new Error("You have to use AppContextProvider in your App");
  return context;
};
