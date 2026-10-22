const ZOOM_KEYS = new Set(["+", "-", "=", "_", "0"])

function isZoomShortcut(event: KeyboardEvent) {
  if (!event.ctrlKey && !event.metaKey) return false
  return ZOOM_KEYS.has(event.key)
}

function onWheel(event: WheelEvent) {
  if (event.ctrlKey || event.metaKey) {
    event.preventDefault()
  }
}

function onKeyDown(event: KeyboardEvent) {
  if (isZoomShortcut(event)) {
    event.preventDefault()
  }
}

function onTouchMove(event: TouchEvent) {
  if (event.touches.length > 1) {
    event.preventDefault()
  }
}

function onGesture(event: Event) {
  event.preventDefault()
}

let initialized = false

export function preventZoom() {
  if (initialized || typeof window === "undefined") return
  initialized = true

  window.addEventListener("wheel", onWheel, { passive: false })
  window.addEventListener("keydown", onKeyDown)
  window.addEventListener("touchmove", onTouchMove, { passive: false })
  window.addEventListener("gesturestart", onGesture)
  window.addEventListener("gesturechange", onGesture)
  window.addEventListener("gestureend", onGesture)
}
