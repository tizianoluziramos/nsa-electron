import { useId, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";
import styles from "../styles/components/LoginModalComponent.module.css";

export function LoginModalComponent() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const titleId = useId();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (username.trim().length === 0 || password.length === 0) {
      setValidationError("Insert username and password.");
      return;
    }
    setValidationError(null);

    try {
      await login(username.trim(), password);
      navigate("/", { replace: true });
    } catch (submitError: any) {
      setError("Error: " + submitError.message);
    }
  };

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className={styles.header}>
          <span className={styles.kicker}>NSA</span>
          <h2 id={titleId} className={styles.title}>
            RESTRICTED ACCESS
          </h2>
        </header>

        <form className={styles.form} onSubmit={onSubmit}>
          <label className={styles.field}>
            User
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              disabled={loading}
              autoFocus
            />
          </label>

          <label className={styles.field}>
            Password
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              disabled={loading}
            />
          </label>

          {validationError ? (
            <p className={styles.error} role="alert">
              {validationError}
            </p>
          ) : null}

          {error ? (
            <p className={styles.error} role="alert">
              {error}
            </p>
          ) : null}

          <button className={styles.submit} type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}