import { compare } from 'bcrypt'
import { NextFunction, Response } from 'express'
import { ObjectId } from 'mongoose'
import { AuthFailedError, BadRequestError, NotFoundError, ResponseError } from '~/Code/error.response'
import keyStoreModel from '~/models/keyStore.model'
import userModel, { UserDocument } from '~/models/user.model'
import { Auth, HTTP, User } from '~/type'
import { hassPassword } from '~/utils/bcrypt'
import { expriresAT, omit, oneWeek, setCookieResponse } from '~/utils/dataResponse'
import {
      createPayload,
      fillDataKeyModel,
      generateCodeVerifyToken,
      generatePaidKey,
      generatePaidToken
} from '~/utils/token'

class AuthService {
      static async register(req: HTTP.CustomRequest<Auth.RegisterParam>, res: Response, next: NextFunction) {
            const { user_email, user_password, user_last_name, user_first_name } = req.body

            console.log('OK')

            if (!user_email || !user_password || !user_first_name || !user_last_name)
                  throw new BadRequestError({ metadata: 'Missing Field' })

            const foundEmail = await userModel.findOne({ user_email: userModel })
            if (foundEmail) throw new BadRequestError({ metadata: 'Email đã tồn tại' })

            const hashPassword = await hassPassword(user_password)

            const createUser = await userModel.create({
                  user_email: user_email,
                  user_password: hashPassword,
                  user_first_name: user_first_name,
                  user_last_name: user_last_name
            })
            if (!createUser) throw new ResponseError({ metadata: 'Không thể đăng kí user do lỗi' })

            const { private_key, public_key } = generatePaidKey()
            if (!public_key || !private_key) throw new ResponseError({ metadata: 'Server không thể tạo key sercet' })

            const payload = createPayload(createUser)

            const token = generatePaidToken<Auth.Token.PayloadJWT>(payload, { public_key, private_key })
            const code_verify_token = generateCodeVerifyToken()

            const { modelKeyQuery, modelKeyUpdate, modelKeyOption } = fillDataKeyModel(
                  createUser,
                  public_key,
                  private_key,
                  token.refresh_token,
                  code_verify_token
            )

            const createKey = await keyStoreModel.findOneAndUpdate(modelKeyQuery, modelKeyUpdate, modelKeyOption)
            if (!createKey) throw new ResponseError({ metadata: 'Server không thể tạo model key' })

            setCookieResponse(res, oneWeek, 'client_id', createUser._id as string, { httpOnly: true })
            setCookieResponse(res, oneWeek, 'code_verify_token', code_verify_token, { httpOnly: true })
            const expireToken = setCookieResponse(res, expriresAT, 'access_token', token.access_token, {
                  httpOnly: true
            })
            setCookieResponse(res, oneWeek, 'refresh_token', token.refresh_token, { httpOnly: true })

            return {
                  user: omit(createUser.toObject(), ['user_password']),
                  token: { access_token: token.access_token, refresh_token: token.refresh_token, code_verify_token },
                  expireToken,
                  client_id: (createUser._id as unknown as ObjectId).toString()
            }
      }

      static async login(req: HTTP.CustomRequest<Auth.LoginParam>, res: Response, next: NextFunction) {
            const { user_email, user_password } = req.body

            const foundUser = await userModel.findOne({ user_email })
            if (!foundUser) throw new NotFoundError({ metadata: 'Không tìm thấy user' })

            const checkPassword = compare(user_password, foundUser?.user_password)
            if (!checkPassword) throw new AuthFailedError({ metadata: 'Something wrongs...' })

            const foundKey = await keyStoreModel.findOneAndDelete({ user_id: foundUser._id })

            const { public_key, private_key } = generatePaidKey()
            if (!public_key || !private_key) throw new ResponseError({ metadata: 'Server không thể tạo key sercet' })

            const payload = createPayload(foundUser)
            const { access_token, refresh_token } = generatePaidToken(payload, { public_key, private_key })
            const code_verify_token = generateCodeVerifyToken()

            const { modelKeyOption, modelKeyUpdate, modelKeyQuery } = fillDataKeyModel(
                  foundUser,
                  public_key,
                  private_key,
                  refresh_token,
                  code_verify_token
            )
            const keyStore = await keyStoreModel.findOneAndUpdate(modelKeyQuery, modelKeyUpdate, modelKeyOption)

            if (!keyStore) throw new ResponseError({ metadata: 'Server không thể tạo model key' })
            setCookieResponse(res, oneWeek, 'client_id', foundUser._id as string, { httpOnly: true })
            setCookieResponse(res, oneWeek, 'code_verify_token', code_verify_token, { httpOnly: true })

            setCookieResponse(res, oneWeek, 'refresh_token', refresh_token, { httpOnly: true })
            const expireToken = setCookieResponse(res, expriresAT, 'access_token', access_token, { httpOnly: true })
            return {
                  user: omit(foundUser.toObject(), ['user_password']),
                  token: { access_token, refresh_token, code_verify_token },

                  expireToken,
                  client_id: (foundUser._id as unknown as ObjectId).toString()
            }
      }

      static async logout(req: HTTP.CustomRequest, res: Response, next: NextFunction) {
            const user = req.user as UserDocument
            const { force } = req.body
            if (force) {
                  await keyStoreModel.findOneAndDelete({ user_id: user._id })
                  return { message: 'Token hết hạn và đẵ buộc phải logout', force }
            }
            await keyStoreModel.findOneAndDelete({ user_id: user._id })
            return { message: 'Logout thành công' }
      }

      static async refresh_token(req: HTTP.CustomRequest, res: Response, next: NextFunction) {
            const { refresh_token } = req
            const user = req.user as UserDocument
            const { public_key, private_key } = generatePaidKey()
            if (!public_key || !private_key) throw new ResponseError({ metadata: 'Server không thể tạo key sercet' })
            const payload = createPayload(user)

            const { access_token, refresh_token: new_refresh_token } = generatePaidToken(payload, {
                  public_key,
                  private_key
            })
            const code_verify_token = generateCodeVerifyToken()

            const keyModelQuery = { user_id: user._id }
            const keyModelUpdate = {
                  $set: { refresh_token: new_refresh_token, private_key, public_key, code_verify_token },
                  $addToSet: { refresh_token_used: refresh_token }
            }
            const keyModelOption = { new: true, upsert: true }

            const updateKeyModel = await keyStoreModel.findOneAndUpdate(keyModelQuery, keyModelUpdate, keyModelOption)
            console.log({ key: updateKeyModel?.toObject() })

            setCookieResponse(res, oneWeek, 'refresh_token', new_refresh_token, { httpOnly: true })
            setCookieResponse(res, oneWeek, 'client_id', user._id as string, { httpOnly: true })
            setCookieResponse(res, oneWeek, 'code_verify_token', code_verify_token, { httpOnly: true })

            const expireToken = setCookieResponse(res, expriresAT, 'access_token', access_token, { httpOnly: true })
            return {
                  user: omit(user.toObject(), ['user_password']),
                  token: { access_token, refresh_token: new_refresh_token, code_verify_token },
                  expireToken,
                  client_id: user._id as string
            }
      }
}

export default AuthService
