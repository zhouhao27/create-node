import express from 'express'
import apiRouter from './api'
import config from './config'

const app = express()

setup()
const server = start()

function setup() {  
  app.use(express.json())
  app.use('/api', apiRouter)
}

function start() {
  return app.listen(config.port, () => {
    console.log(`Start server at ${server.address().port}`)
  })  
}

