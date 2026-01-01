import styles from "./page.module.css";
import WsClient from "../components/WsClient/WsClient";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>RikoooAA</h1>
        <WsClient/>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
