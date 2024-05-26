import { Router } from 'express'
import AuthController from '~/controllers/auth.controller'
import { asyncHandler } from '~/helper/asyncHandler'
import authentication from '~/middlewares/authentication'

const authRouter = Router()

authRouter.post('/register', asyncHandler(AuthController.register))
authRouter.use(authentication)
authRouter.post('/login', asyncHandler(AuthController.login))
authRouter.post('/logout', asyncHandler(AuthController.logout))
authRouter.post('/refresh-token', asyncHandler(AuthController.refresh_token))

export default authRouter
