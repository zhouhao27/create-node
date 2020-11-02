import jwt from 'jsonwebtoken'
import config from '../../config'
import User from './user'
import { info } from '../../utils/logger'

export default class UserService {
  async login(email, password) {
    if (!email || !password) {
      throw new Error('Please provide email and password!')
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.passwordMatch(password, user.password))) {
      throw new Error('Incorrect email or password')
    }

    console.log(info(`${email} login success`))
    return {
      token: jwt.sign({
        id: user.id,
      }, config.jwtSecret, {
        // TODO: config
        expiresIn: 60 * 60
      }),
      user
    }
  }

  async register(userParam) {
    try {
      const newUser = await User.create(userParam)
      return newUser  
    } catch(err) {
      console.error(err)
      return null
    }
  }

  logout(userName) {
    console.log(`logout(${userName})`)
    // TODO: how to make it work
  }
}