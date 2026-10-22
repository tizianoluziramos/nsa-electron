import { useEffect, useRef, useState } from "react";
import { SiArchlinux } from "react-icons/si";
import { StartMenuComponent } from "./StartMenuComponent.tsx";
import styles from "../styles/components/Taskbar.module.css";

export function TaskbarComponent() {
  const [now, setNow] = useState(() => new Date());
  const [startOpen, setStartOpen] = useState(false);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!startOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (startButtonRef.current?.contains(target)) return;
      const menu = document.getElementById("start-menu");
      if (menu?.contains(target)) return;
      setStartOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setStartOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [startOpen]);

  useEffect(() => {
    const toggle = () => setStartOpen((value) => !value);

    const system = window.system;
    if (system?.onToggleStartMenu) {
      return system.onToggleStartMenu(toggle);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Meta" || event.key === "Super") {
        event.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], { month: "short", day: "2-digit" });

  return (
    <>
      <StartMenuComponent open={startOpen} onClose={() => setStartOpen(false)} />
      <footer className={styles.taskbar} aria-label="Taskbar">
        <button
          ref={startButtonRef}
          className={styles.start}
          type="button"
          aria-label="Start"
          aria-expanded={startOpen}
          aria-controls="start-menu"
          onClick={() => setStartOpen((value) => !value)}
        >
          <SiArchlinux className={styles.startIcon} aria-hidden="true" />
        </button>

        <div className={styles.apps} />

        <div className={styles.tray}>
          <time className={styles.clock} dateTime={now.toISOString()}>
            {time}
            <span className={styles.date}>{date}</span>
          </time>
        </div>
      </footer>
    </>
  );
}