import { NextFunction, Request, Response } from 'express'
import { CREATE, OK } from '~/Code/success.response'
import AuthService from '~/services/auth.service'
import { HTTP } from '~/type'

class AuthController {
      static async register(req: HTTP.CustomRequest, res: Response, next: NextFunction) {
            return new CREATE({ metadata: await AuthService.register(req, res, next) }).send(res)
      }

      static async login(req: Request, res: Response, next: NextFunction) {
            return new OK({ metadata: await AuthService.login(req, res, next) }).send(res)
      }

      static async logout(req: Request, res: Response, next: NextFunction) {
            return new OK({ metadata: await AuthService.logout(req, res, next) }).send(res)
      }

      static async refresh_token(req: Request, res: Response, next: NextFunction) {
            return new OK({ metadata: await AuthService.refresh_token(req, res, next) }).send(res)
      }
      static async loginWithGoogle(
            req: Request<unknown, unknown, unknown, { code: any }>,
            res: Response,
            next: NextFunction
      ) {
            new OK({ metadata: await AuthService.loginWithGoogle(req) }).send(res)
      }
}

export default AuthController
