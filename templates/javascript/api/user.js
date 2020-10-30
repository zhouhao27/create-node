import express from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'

const userRouter = express.Router()

/**
 * @swagger
 * definitions:
 *  Login:
 *    type: "object"
 *    properties:
 *      username: 
 *        type: "string"
 *      password:
 *        type: "string"
 */ 

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
 *          $ref: "#/definitions/Login"
 *      responses:
 *        200:
 *          description: "successful operation"
 *        401:
 *          description: "Wrong username or password!"
 */
userRouter.post('/login', (req, res) => {
  if (req.body.username === 'admin' && req.body.password === 'admin') {
    console.log('login success...')
    res.json({
      id: 1,
      username: 'admin',
      jwt: jwt.sign({
        id: 1,
      }, config.jwtSecret, {
        expiresIn: 60 * 60
      })
    })
  } else {
    res.status(401).json({
      error: {
        message: 'Wrong username or password!'
      }
    });
  }
})

export default userRouter