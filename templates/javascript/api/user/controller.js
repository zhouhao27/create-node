import express from 'express'
import UserService from './service'

const userRouter = express.Router()

userRouter
  /**
   * @swagger
   * /user/login:
   *    post:
   *      tags:
   *      - "user"
   *      summary: "Login"
   *      description: ""
   *      operationId: "login"
   *      consumes:
   *      - "application/json"
   *      produces:
   *      - "application/json"
   *      parameters:
   *      - in: "body"
   *        name: "body"
   *        description: "User object that needs to be added. Include username,password"
   *        required: true
   *        schema:
   *          type: "object"
   *          properties:
   *            email:
   *              type: "string"
   *              format: "email"
   *            password:
   *              type: "string"
   *      responses:
   *        200:
   *          description: "successful operation"
   *        401:
   *          description: "Wrong username or password!"
   */
  .post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
      const service = new UserService()
      const user = await service.login(email, password)
      return res.json(user)  
    } catch(err) {
      return res.status(401).send(`${err}`)
    }
  })
  /**
   * @swagger
   * /user/register:
   *    post:
   *      tags:
   *      - "user"
   *      summary: "Create a new user"
   *      description: ""
   *      operationId: "register"
   *      consumes:
   *      - "application/json"
   *      produces:
   *      - "application/json"
   *      parameters:
   *      - in: "body"
   *        name: "body"
   *        description: "Signup"
   *        required: true
   *        schema:
   *          $ref: "#/definitions/User"
   *      responses:
   *        200:
   *          description: "successful operation"
   *        401:
   *          description: "Wrong username or password!"
   */
  .post('/register', async (req, res) => {
    // TODO: Better error handling
    const userParams = req.body
    const service = new UserService()
    const user = await service.register(userParams)
    if (user) {      
      return res.json(user)  
    }
    return res.status(401).send('Failed to register')   
  })
  /**
   * @swagger
   * /user/logout:
   *    post:
   *      tags:
   *      - "user"
   *      summary: "Logout"
   *      description: ""
   *      operationId: "logout"
   *      consumes:
   *      - "application/json"
   *      produces:
   *      - "application/json"
   *      parameters:
   *      - in: "body"
   *        name: "body"
   *        description: "User object that needs to be added. Include username,password"
   *        required: true
   *        schema:
   *          type: "object"
   *          properties:
   *            userName:
   *              type: "string"
   *      responses:
   *        200:
   *          description: "successful operation"
   */    
  .post('/logout', (req,res) => {
    const { userName } = req.body    
    const service = new UserService()
    service.logout(userName)
    res.status(200).json({ status: 'success' });    
  })

export default userRouter