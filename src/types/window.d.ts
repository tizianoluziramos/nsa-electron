declare global {
  interface Window {
    system?: {
      getPlatform: () => string
      getInfo: () => {
        platform: string
        arch: string
        versions: { node: string; chrome: string; electron: string }
      }
      onToggleStartMenu: (callback: () => void) => () => void
    }
  }
}

export {}