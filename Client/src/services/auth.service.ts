// import { addToast } from '../Redux/toast'
// import { store } from '../store'
// import { TResponseApi } from '../types/axiosResponse'
// import { UserResponse } from '../types/user.type'

import axiosCustom from '../apis/http'

class Auth {
      static async login(form: Auth.LoginParam) {
            const { user_email, user_password } = form

            return axiosCustom.post<API.ResponseCommomApi<{ user: User.UserSchema }>>(
                  '/v1/api/auth/login',
                  { user_email, user_password },
                  { withCredentials: true }
            )
      }

      static async register(form: Auth.RegisterParam) {
            console.log('gọi api', form)

            const { user_email, user_first_name, user_last_name, user_password } = form
            return axiosCustom.post<API.ResponseCommomApi<{ user: User.UserSchema }>>(
                  '/v1/api/auth/register',
                  { user_email, user_password, user_first_name, user_last_name },
                  { withCredentials: true }
            )
      }

      static async logout() {
            return axiosCustom.post('/v1/api/auth/logout', {}, { withCredentials: true })
      }

      static async refresh_token() {
            return axiosCustom.post<{ metadata: { token: string } }>(
                  '/v1/api/auth/refresh-token',
                  {},
                  { withCredentials: true }
            )
      }
}

export default Auth
