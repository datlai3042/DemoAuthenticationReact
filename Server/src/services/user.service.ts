import { NextFunction, Response } from 'express'
import { BadRequestError } from '~/Code/error.response'
import userModel from '~/models/user.model'
import { Auth, HTTP } from '~/type'
import { omit } from '~/utils/dataResponse'

class UserService {
      static async getMe(req: HTTP.CustomRequest, res: Response, next: NextFunction) {
            const { user } = req
            return { user: omit(user?.toObject(), ['user_password']) }
      }

      static async updateInfo(
            req: HTTP.CustomRequest<{ form: Omit<Auth.RegisterParam, 'user_password'> }>,
            res: Response,
            next: NextFunction
      ) {
            const { user } = req
            const { form } = req.body

            const userUpdateQuery = { _id: user?._id }
            const userUpdate = {
                  $set: {
                        user_email: form.user_email,
                        user_first_name: form.user_first_name,
                        user_last_name: form.user_last_name
                  }
            }
            const userUpdateOption = { new: true, upsert: true }

            const updateUserDoc = await userModel.findOneAndUpdate(userUpdateQuery, userUpdate, userUpdateOption)
            if (!updateUserDoc) throw new BadRequestError({ metadata: 'Update thông tin không thành công' })
            return { user: omit(user?.toObject(), ['user_password']) }
      }
}

export default UserService
