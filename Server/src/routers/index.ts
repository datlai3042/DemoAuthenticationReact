import { Router } from 'express'
import authRouter from './auth'
import userRouter from './user'

const router = Router()

router.get('/', (req, res, next) => res.json('Xin chào'))
router.use('/v1/api/auth', authRouter)
router.use('/v1/api/user', userRouter)

export default router
