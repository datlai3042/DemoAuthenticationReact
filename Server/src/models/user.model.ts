import { Document, Schema, model } from 'mongoose'
import { User } from '~/type'

const COLLECTION_NAME = 'users'
const DOCUMENT_NAME = 'User'

export type UserDocument = User.UserSchema & Document

const userSchema = new Schema<UserDocument>(
      {
            user_first_name: { type: String, default: '' },
            user_last_name: { type: String, default: '' },
            user_email: { type: String, required: true },
            user_password: { type: String, required: true }
      },
      { collection: COLLECTION_NAME, timestamps: true }
)

const userModel = model<UserDocument>(DOCUMENT_NAME, userSchema)

export default userModel
