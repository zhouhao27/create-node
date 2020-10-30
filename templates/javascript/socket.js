import SocketIO from 'socket.io'
import { error, info, warning } from './utils/logger'

// TODO: I don't know if this is the best approach
export default class Socket {
  constructor(server) {
    this.io = SocketIO(server)
  }
  
  start() {
    console.log(info('Socket server started'))

    this.io.on('connection', (socket) => {
      console.log(info('New user connected'))
    })
  }
}