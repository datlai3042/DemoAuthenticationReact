import { Response } from 'express'
import statusCode from './status_code'
import reasonCode from './reason_code'
import { HTTP } from '~/type'

class ResponseSuccess {
      private code: number
      private message: string
      private metadata: any

      constructor({ code = statusCode.OK, message = reasonCode.OK, metadata }: HTTP.API) {
            this.code = code
            this.message = message
            this.metadata = metadata
      }

      send(res: Response) {
            return res.json(this)
      }
}

class CREATE extends ResponseSuccess {
      constructor({ code = statusCode.CREATED, message = reasonCode.CREATED, metadata = {} }: HTTP.API) {
            super({ code, message, metadata })
      }
}

class OK extends ResponseSuccess {
      constructor({ code = statusCode.OK, message = reasonCode.OK, metadata = {} }: HTTP.API) {
            super({ code, message, metadata })
      }
}

export { CREATE, ResponseSuccess, OK }
