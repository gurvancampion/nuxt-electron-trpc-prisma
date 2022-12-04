import path from 'path'
import { PrismaClient } from '@prisma/client'
import { app } from 'electron'
// // need to import something from "electron" to add electron-specific types to `process`
// import type { } from "electron"
// https://www.electronjs.org/docs/latest/api/process
// https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
// Prevent multiple instances of Prisma Client in development
// Add prisma to the global type
declare global {
  // Must use var, not let or const: https://stackoverflow.com/questions/35074713/extending-typescript-global-object-in-node-js/68328575#68328575
  // eslint-disable-next-line no-var, vars-on-top
  var prisma: PrismaClient
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dbPath
  = process.env.NODE_ENV === 'development'
    ? path.join(__dirname, process.env.DATABASE_URL!)
    : path.join(app.getPath('userData'), 'app.db')

export const prisma = global.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'info', 'error', 'warn']
    : ['error'],
})

if (process.env.NODE_ENV !== 'production')
  global.prisma = prisma
