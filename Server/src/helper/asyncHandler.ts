import { NextFunction, Request, RequestHandler, Response } from 'express'
import { HTTP } from '~/type'

export const asyncHandler = (fn: RequestHandler): RequestHandler => {
      return (req: Request | HTTP.CustomRequest, res: Response, next: NextFunction) => {
            return Promise.resolve(fn(req, res, next)).catch(next)
      }
}
