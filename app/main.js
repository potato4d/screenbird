const production = true;

if(production){
  process.env = Object.assign(
    Object.create(null),
    process.env,
    {
      TWITTER_KEY    : "",
      TWITTER_SECRET : "",
      mode           : ""
    }
  )
}else{
  require('dotenv').config()
}

const electron = require('electron')
const app = electron.app
const Menu = electron.Menu
const BrowserWindow = electron.BrowserWindow

const oauth = require("./src/browser/oauth");

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {

  const screen = electron.screen;
  const size = screen.getPrimaryDisplay().size;

  mainWindow = new BrowserWindow(
    {
      x: 0,
      y: 0,
      width: size.width,
      height: size.height,
      frame: false,
      show: true,
      transparent: true,
      resizable: false,
      alwaysOnTop: true
    }
  )

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
  const menu = Menu.buildFromTemplate(
    [{
      label: 'Edit',
      submenu: [
        // {
        //   label: 'About ScreenBird',
        //   click: function(){
        //     const openAboutWindow = require("about-window").default;
        //     openAboutWindow(
        //       {
        //         package_json_dir : path.join(__dirname, 'package.json'),
        //         icon_path        : path.join(__dirname, 'icon.png'),
        //         description      : "The screen capture tool to Twitter like Gyazo."
        //       }
        //     );
        //   }
        // },
        // {
        //   type: 'separator'
        // },
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        },
        {
          label: 'Debug',
          accelerator: 'Command+Option+I',
          click: function () {
            mainWindow.openDevTools()
          }
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function () {
            app.quit()
          }
        }
      ]
    }]
  )
  Menu.setApplicationMenu(menu)
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
