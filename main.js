// Modules
const { app, BrowserWindow, session, dialog } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  const ses = session.defaultSession;
  mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true },
    show: false,
  });
  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");

  mainWindow.once("ready-to-show", () => {
    mainWindow.maximize();
    mainWindow.show();
  });
  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // dialog

  const answers = ["Yes", "No"];
  dialog
    .showMessageBox({
      title: "Close",
      message: "Did you want to close app",
      detail: "Answer with yes or no",
      buttons: answers,
    })
    .then(result => {
      if (result.response == 0) ;
    });
}

// Electron `app` is ready
app.on("ready", () => {
  createWindow();
});

// console.log(app.getPath("userData"));
// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
