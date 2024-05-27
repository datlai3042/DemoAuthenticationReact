import { NextFunction, Response } from 'express'
import { OK } from '~/Code/success.response'
import UserService from '~/services/user.service'
import { HTTP } from '~/type'

class UserController {
      static async getMe(req: HTTP.CustomRequest, res: Response, next: NextFunction) {
            return new OK({ metadata: await UserService.getMe(req, res, next) }).send(res)
      }
      static async updateInfo(req: HTTP.CustomRequest, res: Response, next: NextFunction) {
            return new OK({ metadata: await UserService.updateInfo(req, res, next) }).send(res)
      }
}

export default UserController
