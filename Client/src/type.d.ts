/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace API {
      export type ResponseRegister<T extends object> = {
            code: number
            message: string
            metadata: {
                  user: T
                  access_token: string
            }
      }

      type ResponseCommomApi<Data> = {
            code: number
            message: string

            metadata: Data
      }

      type ServerMessageVerify = {
            message: string
      }
}

namespace User {
      type UserSchema = {
            _id: string
            user_first_name: string
            user_last_name: string
            user_email: string
            user_password: string
      }
}

namespace Auth {
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

namespace Toast {
      type TToast = {
            type: 'SUCCESS' | 'ERROR' | 'WARNNING'
            message: string
            id: string
            subMessage?: string[]
      }
}
