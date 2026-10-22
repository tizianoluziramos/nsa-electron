const { app, BrowserWindow, protocol, net, Menu } = require("electron");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const DIST = path.join(__dirname, "dist");

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { standard: true, secure: true, supportFetchAPI: true } },
]);

const resolveFile = (pathname) => {
  const file = path.join(DIST, decodeURIComponent(pathname));
  const valid = file.startsWith(DIST) && fs.existsSync(file) && fs.statSync(file).isFile();
  return valid ? file : path.join(DIST, "index.html");
};

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);

  protocol.handle("app", (request) =>
    net.fetch(pathToFileURL(resolveFile(new URL(request.url).pathname)).toString()),
  );

  const win = new BrowserWindow({
    fullscreen: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      devTools: false,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.setMenu(null);
  win.setMenuBarVisibility(false);

  const isDevToolsShortcut = (input) => {
    const key = input.key;
    const ctrlOrCmd = input.control || input.meta;
    if (key === "F12" || key === "F10") return true;
    if (ctrlOrCmd && input.shift && (key === "I" || key === "i" || key === "J" || key === "j" || key === "C" || key === "c")) return true;
    if (ctrlOrCmd && (key === "U" || key === "u")) return true;
    return false;
  };

  let lastToggleAt = 0;
  win.webContents.on("before-input-event", (event, input) => {
    if (input.key === "Alt" || input.key === "AltLeft" || input.key === "AltRight") {
      event.preventDefault();
      return;
    }
    if (isDevToolsShortcut(input)) {
      event.preventDefault();
      return;
    }
    if (input.key !== "Meta") return;
    event.preventDefault();
    if (input.type !== "keyDown" || input.isAutoRepeat) return;
    const now = Date.now();
    if (now - lastToggleAt < 300) return;
    lastToggleAt = now;
    win.webContents.send("start-menu:toggle");
  });

  win.webContents.on("devtools-opened", () => {
    win.webContents.closeDevTools();
  });

  win.webContents.on("context-menu", (event) => {
    event.preventDefault();
  });

  win.loadURL("app://local/");
});

app.on("web-contents-created", (_event, contents) => {
  contents.on("devtools-opened", () => {
    contents.closeDevTools();
  });
  contents.on("context-menu", (event) => {
    event.preventDefault();
  });
});

app.on("window-all-closed", () => app.quit());