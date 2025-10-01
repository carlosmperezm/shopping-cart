import styles from "./styles.module.css";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1>Home Page</h1>
        <h2>Welcome to your favorite shopping App!!</h2>
        <h3>To get you started, start shopping first</h3>
        <a className={styles.link} href="/shop">
          <ArrowRight size={90} />
        </a>
      </div>
    </div>
  );
}
