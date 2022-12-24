// Modules
const { app, BrowserWindow, Menu, MenuItem } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let mainMenu = new Menu();
let MenuItem1 = new MenuItem({ label: "Files", submenu: [{ label: "Home" }] });

mainMenu.append(MenuItem1);
// Create a new BrowserWindow when `app` is ready
function createWindow() {
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
  Menu.setApplicationMenu(mainMenu);
  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
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
