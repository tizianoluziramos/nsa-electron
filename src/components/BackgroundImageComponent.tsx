import styles from '../styles/components/BackgroundImageComponent.module.css'

export function BackgroundImageComponent() {
  return (
    <img
      className={styles.background}
      src="/background.webp"
      alt="NSA Background Image"
      fetchPriority="high"
      draggable={false}
    />
  )
}
