// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const electronReload = require("electron-reload");

electronReload(__dirname);

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //show: false,
    title: "Apple Music",
    frame: false,
    transparent: true,
    maximizable: true,
    icon: path.join(__dirname + "/assets/", "apple-music.png"),
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webviewTag: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.setMenuBarVisibility(false);
  //mainWindow.loadURL("http://music.apple.com/")
  mainWindow.loadFile("index.html");

  // SPLASH SCREEN //
  const splash = new BrowserWindow({
    width: 620,
    height: 300,
    show: false,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
  });

  splash.loadFile("splash.html");
  splash.center();
  /*setTimeout(function () {
    splash.close();
    mainWindow.show();
  }, 3000);*/
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.handle("app_close", () => {
  app.quit();
});

ipcMain.handle("app_min", () => {
  const window = BrowserWindow.getFocusedWindow();
  window.minimize();
});

ipcMain.handle("app_max", () => {
  const window = BrowserWindow.getFocusedWindow();
  if (!window.isMaximized()) {
    window.maximize();
  } else {
    window.unmaximize();
  }
});

ipcMain.handle("app_max_db", () => {
  const window = BrowserWindow.getFocusedWindow();
  if (!window.isMaximized()) {
    window.maximize();
  } else {
    window.unmaximize();
  }
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("test", (e) => {
  const window = BrowserWindow.getFocusedWindow();
});

try {
  require('electron-reloader')(module)
} catch (_) {}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
