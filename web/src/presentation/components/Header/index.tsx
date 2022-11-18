import styles from "./styles.module.css";

export function Header() {
  return (
    <header className={styles.root}>
      <h1>
        <img src="/rocket.svg" alt="rocket" />
        to<span>do</span>
      </h1>
    </header>
  );
}
