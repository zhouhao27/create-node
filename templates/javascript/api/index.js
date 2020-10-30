import { Router } from 'express'
import helloRouter from './hello'
import apiDocRouter from './api-doc'
import userRouter from './user/controller'
import auth from '../middlewares/auth'

const apiRouter = Router()

// no need token
apiRouter.use('/user', userRouter)
apiRouter.use('/doc', apiDocRouter)

// add middleware
apiRouter.use('/',auth)

// need token
apiRouter.use('/hello', helloRouter)

export default apiRouter