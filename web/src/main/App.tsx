import { useCaseTodoListFactory } from "@/main/factories/useCases/remoteTodoListUseCases";
import { Header } from "@/presentation/components";
import { Home } from "@/presentation/pages/Home";

import "@/presentation/styles/global.css";
import { AppContextProvider } from "@/presentation/context/AppContext";

const { useCaseTodoList } = useCaseTodoListFactory();

export function App() {
  return (
    <AppContextProvider useCaseTodoList={useCaseTodoList}>
      <Home />
    </AppContextProvider>
  );
}
