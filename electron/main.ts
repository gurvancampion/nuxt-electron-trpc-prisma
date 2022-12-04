import { release } from 'os'
import path from 'path'
import { BrowserWindow, app, ipcMain, shell } from 'electron'
import { SerialPort } from 'serialport'
// Use relative path to avoid issues
import ipcRequestHandler from '../server/trpc/ipcRequestHandler'
import { appRouter } from '../server/trpc/routers'
import type { IpcRequest } from '~~/types/Ipc'

process.env.ROOT = path.join(__dirname, '..')
process.env.DIST = path.join(process.env.ROOT)
process.env.VITE_PUBLIC = app.isPackaged
  ? path.join(process.env.ROOT, '../dist')
  : path.join(process.env.ROOT, 'public')
// Remove electron security warnings only in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/securit
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1'))
  app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32')
  app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null

const preload = path.join(process.env.DIST, 'electron/preload.js')

async function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      preload,
      // Warning: Enabling nodeIntegration and disabling contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  if (app.isPackaged) {
    win.loadFile(path.join(process.env.VITE_PUBLIC!, 'index.html'))
  }
  else {
    win.loadURL(process.env.VITE_DEV_SERVER_URL!)
    win.webContents.openDevTools()
  }

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:'))
      shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized())
      win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length)
    allWindows[0].focus()

  else
    createWindow()
})

app.whenReady().then(() => {
  ipcMain.handle('serialport:list', () => SerialPort.list())
  ipcMain.handle('trpc', (event, req: IpcRequest) => {
    return ipcRequestHandler({
      endpoint: '/trpc',
      req,
      router: appRouter,
      createContext: async () => {
        return {}
      },
    })
  })
  createWindow()
})
