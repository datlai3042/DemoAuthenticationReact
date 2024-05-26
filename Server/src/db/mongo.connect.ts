import mongoose, { Mongoose } from 'mongoose'
import { config } from 'dotenv'

config()

class MongoConnect {
      static connect: Promise<Mongoose>

      static async ConnectDb(): Promise<Mongoose> {
            const mongo_uri = process.env.MONGO_URI as string
            if (!MongoConnect.connect) {
                  MongoConnect.connect = mongoose.connect(mongo_uri)
                  MongoConnect.connect
                        .then(() => console.log('Kết nối mongoDb thành công'))
                        .catch((e) => console.log(`Kết nối mongoDb thất bật error::${e}`))
                  return MongoConnect.connect
            }

            return MongoConnect.connect
      }
}

export default MongoConnect
