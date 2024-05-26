import { Request } from 'express'
import { UserDocument } from './models/user.model'

namespace User {
      type UserSchema = {
            user_first_name: string
            user_last_name: string
            user_email: string
            user_password: string
      }

      type KeyStoreSchema = {
            user_id: Types.ObjectId
            public_key: string
            private_key: string
            code_verify_token: string
            refresh_token: string
            refresh_token_used: string[]
      }
}

namespace HTTP {
      type API = {
            code?: number
            message?: string
            metadata: any
      }
      interface ErrorServer extends Error {
            code?: number
            detail?: string
            metadata: any
      }
      interface CustomRequest<Body = any, Query = any> extends Request {
            user?: UserDocument
            keyStore?: KeyManagerDocument
            refresh_token?: string
            force?: boolean
            router?: string
            body: Body
            query: Query
      }
}

namespace Auth {
      namespace Token {
            export type Key = {
                  public_key: string
                  private_key: string
            }

            export type PairToken = {
                  access_token: string
                  refresh_token: string
            }

            export type PayloadJWT = {
                  _id: Types.ObjectId
                  user_email: string
            }
      }
      type LoginParam = {
            user_email: string
            user_password: string
      }

      type RegisterParam = {
            user_first_name: string
            user_last_name: string
            user_email: string
            user_password: string
      }
}
