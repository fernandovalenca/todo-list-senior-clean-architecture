import { ButtonHTMLAttributes } from "react";
import { PlusCircle } from "phosphor-react";
import styles from "./styles.module.css";

type CreateButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function CreateButton(props: CreateButtonProps) {
  return (
    <button className={styles.root} {...props}>
      Criar
      <PlusCircle size={15} weight="bold" />
    </button>
  );
}
