import { Router } from 'express'
import UserController from '~/controllers/user.controller'
import { asyncHandler } from '~/helper/asyncHandler'
import authentication from '~/middlewares/authentication'

const userRouter = Router()

userRouter.use(authentication)
userRouter.get('/get-me', asyncHandler(UserController.getMe))
userRouter.post('/update-info', asyncHandler(UserController.updateInfo))

export default userRouter
