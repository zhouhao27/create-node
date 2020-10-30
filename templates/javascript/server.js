import config from './config'
import app from './app'
import mongoose from 'mongoose'
import Socket from './socket'
import { error, info, warning } from './utils/logger'

const start = () => {  
  // start server
  const server = app.listen(config.port, () => {
    console.log(info(`Start server at ${server.address().port}`))
  })    

  // start database
  // const db = process.env.DATABASE.replace(
  //   '<PASSWORD>',
  //   process.env.DATABASE_PASSWORD
  // )  
  mongoose
    .connect(config.databaseURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log(info('DB connection successful!')))
    
  const socket = new Socket(server)
  socket.start()
}

start()
