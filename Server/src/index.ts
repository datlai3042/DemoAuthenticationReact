import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

import { config } from 'dotenv'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import bodyParser from 'body-parser'
import MongoConnect from './db/mongo.connect'
import router from './routers'
import { HTTP } from './type.js'
import errorHandler from './helper/errorHandler'

config()
const app = express()

MongoConnect.ConnectDb()
app.use(helmet())
app.use(compression())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
      cors({
            origin: process.env.MODE === 'DEV' ? 'http://localhost:3000' : process.env.CLIENT_URL, // Cho phép truy cập từ origin này
            methods: ['GET', 'POST'], // Chỉ cho phép các phương thức GET và POST
            allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // Chỉ
            credentials: true
      })
)

app.use('', router)

app.use((error: HTTP.ErrorServer, req: Request, res: Response, next: NextFunction) => {
      return errorHandler(error, req, res, next)
})

app.listen(process.env.MODE === 'DEV' ? 4000 : process.env.PORT, () => {
      console.log('comming', process.env.MODE)
})
