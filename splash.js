function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 620,
      height: 300,
      resizable: false,
      webPreferences: {
         preload: path.join(__dirname, 'preload.js')
       }
    })
    // and load the index.html of the app.
    mainWindow.loadFile('splash.html')
    mainWindow.center();
    // Open the DevTools.  
   // mainWindow.webContents.openDevTools()
  }