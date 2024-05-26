import { Router } from 'express'
import authRouter from './auth'

const router = Router()

router.get('/', (req, res, next) => res.json('Xin chào'))
router.use('/v1/api/auth', authRouter)

export default router
