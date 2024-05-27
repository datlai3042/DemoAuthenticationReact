import axiosCustom from '../apis/http'
import { UpdateUser } from '../pages/home/components/AccountSection'

class UserService {
      static async getMe() {
            return axiosCustom.get<API.ResponseCommomApi<{ user: User.UserSchema }>>('/v1/api/user/get-me', {
                  withCredentials: true
            })
      }

      static async updateInfo(form: UpdateUser) {
            return axiosCustom.post<API.ResponseCommomApi<{ user: User.UserSchema }>>(
                  '/v1/api/user/update-info',
                  { form },
                  {
                        withCredentials: true
                  }
            )
      }
}

export default UserService
