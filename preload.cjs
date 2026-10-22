const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('system', {
  getPlatform: () => process.platform,

  getInfo: () => ({
    platform: process.platform,
    arch: process.arch,
    versions: {
      node: process.versions.node,
      chrome: process.versions.chrome,
      electron: process.versions.electron
    }
  }),

  onToggleStartMenu: (callback) => {
    const handler = () => callback()
    ipcRenderer.on('start-menu:toggle', handler)
    return () => ipcRenderer.removeListener('start-menu:toggle', handler)
  }
})