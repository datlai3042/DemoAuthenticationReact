import { Types } from 'mongoose'
import { Document, ObjectId, Schema, model } from 'mongoose'
import { User } from '~/type'

const DOCUMENT_NAME = 'KeyStore'
const COLLECTION_NAME = 'keyStores'

export type KeyStoreDocument = Document & User.KeyStoreSchema

const keyStoreSchema = new Schema<KeyStoreDocument>(
      {
            user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            public_key: { type: String, required: true },
            private_key: { type: String, required: true },
            code_verify_token: { type: String, required: true },
            refresh_token: { type: String, required: true },
            refresh_token_used: { type: [String], required: true }
      },
      { collection: COLLECTION_NAME, timestamps: true }
)

const keyStoreModel = model<KeyStoreDocument>(DOCUMENT_NAME, keyStoreSchema)

export default keyStoreModel
