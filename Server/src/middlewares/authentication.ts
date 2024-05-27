import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import { AuthFailedError, BadRequestError, ForbiddenError } from '~/Code/error.response'
import { asyncHandler } from '~/helper/asyncHandler'
import keyStoreModel from '~/models/keyStore.model'
import userModel from '~/models/user.model'
import { HTTP } from '~/type'
import { verifyAccessToken, verifyRefreshToken } from '~/utils/token'

interface IHEADER {
      CLIENT_ID: string
      AUTHORIZATION: string
}

export const HEADER: IHEADER = {
      CLIENT_ID: 'x-client-id',
      AUTHORIZATION: 'authorization'
}

const authentication = asyncHandler(async (req: HTTP.CustomRequest, res: Response, next: NextFunction) => {
      const client_id = req.cookies['client_id'] as string
      if (!client_id) throw new BadRequestError({ metadata: 'CLIENT::Không truyền user_id' })

      const access_token = req.cookies['access_token'] as string
      if (!access_token) throw new ForbiddenError({ metadata: 'Không tìm thấy access_token' })

      const user = await userModel.findOne({ _id: new Types.ObjectId(client_id) })
      if (!user) throw new ForbiddenError({ metadata: 'Không tìm thấy user' })

      const force = req.body.force
      if (force && req.originalUrl === '/v1/api/auth/logout') {
            req.user = user
            return next()
      }

      const keyStore = await keyStoreModel.findOne({ user_id: user._id })
      if (!keyStore) throw new ForbiddenError({ metadata: 'Không tìm thấy key của user' })

      //CASE: Auth refresh_token
      if (req.originalUrl === '/v1/api/auth/refresh-token') {
            const refresh_token = req.cookies['refresh_token'] as string
            if (!refresh_token) return next(new AuthFailedError({ metadata: 'Không tìm thấy refresh_token' }))
            return verifyRefreshToken({
                  client_id,
                  user,
                  keyStore,
                  token: refresh_token,
                  key: keyStore.private_key,
                  req,
                  res,
                  next
            })
      }

      //CASE: Auth access_token
      if (access_token) {
            return verifyAccessToken({
                  client_id,
                  user,
                  keyStore,
                  token: access_token,
                  key: keyStore.public_key,
                  req,
                  res,
                  next
            })
      }
})

export default authentication
