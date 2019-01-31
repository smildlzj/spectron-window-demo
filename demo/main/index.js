const { app, BrowserWindow } = require('electron')
const path = require('path')

function createDashboardWindow () {
  let win = new BrowserWindow({ 
    width: 800, 
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true
    }
  })
  win.loadURL('file:///' + path.join(__dirname, '../renderer/dashboard.html'))
  win.on('closed', () => {
    win = null
  })

  return win
}


function createLoginWindow () {
  let win = new BrowserWindow({ 
    width: 500, 
    height: 300,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true
    }
  })
  win.loadURL('file:///' + path.join(__dirname, '../renderer/login.html'))
  win.webContents.on('login', ({
    username,
    password
  }) => {
    if (username == 'admin' && password == 'admin') {
      createDashboardWindow()
      win.close()
    } else {
      win.webContents.emit('login-error', 'username or password is wrong.')
    }
  })
  win.once('ready-to-show', () => {
    win.show()
  })
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createLoginWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
