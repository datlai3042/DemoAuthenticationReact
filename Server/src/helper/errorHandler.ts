import { NextFunction, Request, Response } from 'express'
import reasonCode from '~/Code/reason_code'
import statusCode from '~/Code/status_code'
import { HTTP } from '~/type'

const errorHandler = <ErrorCustom extends HTTP.ErrorServer>(
      error: ErrorCustom,
      req: Request,
      res: Response,
      next: NextFunction
) => {
      console.log('errroHandle', JSON.parse(JSON.stringify(error.stack || 'Not')))

      const code = error.code ? error.code : statusCode.INTERNAL_SERVER_ERROR
      const message = error.message ? error.message : reasonCode.INTERNAL_SERVER_ERROR
      const metadata = error.metadata ? error.metadata : null
      return res.status(code).send({ code, message, metadata })
}

export default errorHandler
