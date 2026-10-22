import { TaskbarComponent } from "../components/TaskbarComponent.tsx";
import styles from "../styles/layouts/Layout.module.css";

export function HomePage() {
  return (
    <div className={styles.layout}>
      <main className={styles.pageContent} />
      <TaskbarComponent />
    </div>
  );
}