import { Server as SocketIOServer } from 'socket.io'

export {}

declare global {
  namespace Express {
    export interface Request {
      io?: SocketIOServer
    }
  }
}
