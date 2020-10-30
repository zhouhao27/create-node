import express from 'express'

const helloRouter = express.Router()

/**
 * @swagger
 * /hello:
 *    get:
 *      tags:
 *      - "hello"
 *      summary: Say hello
 *      description: ""
 *      operationId: "hello"
 *      produces:
 *      - "application/json"
 *      parameters: []
 *      security:
 *      - jwt: [] 
 *      responses:
 *        200:
 *          description: "successful operation"
 */
helloRouter.get('/', (req, res) => {
	res.status(200).json({data: 'Hello World!'})  
})

export default helloRouter