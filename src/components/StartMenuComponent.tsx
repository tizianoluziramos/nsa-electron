import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";
import styles from "../styles/components/StartMenuComponent.module.css";
import { IoIosLogOut } from "react-icons/io";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function StartMenuComponent({ open, onClose }: Props) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (!open) return null;

  const handleLogout = async () => {
    onClose();
    try {
      await logout();
    } catch (error: unknown) {
      throw new Error('Error: ' + error);
    }
    navigate("/login", { replace: true });
  };

  return (
    <div
      id="start-menu"
      role="dialog"
      aria-modal="false"
      aria-label="Start menu"
      data-testid="start-menu"
      className={styles.menu}
    >
      <div className={styles.menuInner} role="menu" aria-label="Start menu">
        <h2 className={styles.title}>Start Menu</h2>
        <div className={styles.spacer} />
        <button
          className={styles.logout}
          type="button"
          onClick={handleLogout}
          aria-label="Log out"
        >
          <IoIosLogOut className={styles.logoutIcon} aria-hidden="true" />
          Logout
        </button>
      </div>
    </div>
  );
}