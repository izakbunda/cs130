const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 450,
    height: 640,
    // frame: false,
    // resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, "resources/icons/sharkie.icns")
  });

  mainWindow.loadURL("https://todogotchi.vercel.app");

  

  mainWindow.on("closed", function () {
    app.quit();
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
