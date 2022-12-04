import { contextBridge, ipcRenderer } from 'electron'
import type { IpcRequest } from '~~/types/Ipc'

// Expose main process methods (Node.js to browser communcation)
contextBridge.exposeInMainWorld('api', {
  serialport: {
    list: () => ipcRenderer.invoke('serialport:list'),
  },
  trpc: (req: IpcRequest) => ipcRenderer.invoke('trpc', req),
})
