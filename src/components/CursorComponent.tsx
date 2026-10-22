import { useCursorify } from '@cursorify/react'
import styles from '../styles/components/CursorComponent.module.css'

export function CursorComponent() {
  const { mouseState, style } = useCursorify()

  return (
    <div
      aria-hidden="true"
      className={styles.cursor}
      data-pointer={style === 'pointer'}
      data-pressed={mouseState === 'mouseDown'}
    >
      <span className={styles.ring} />
      <span className={styles.crosshair} />
      <span className={styles.bracket} data-corner="top-left" />
      <span className={styles.bracket} data-corner="top-right" />
      <span className={styles.bracket} data-corner="bottom-left" />
      <span className={styles.bracket} data-corner="bottom-right" />
      <span className={styles.dot} />
    </div>
  )
}
