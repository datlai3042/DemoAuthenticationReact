"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const COLLECTION_NAME = 'users';
const DOCUMENT_NAME = 'User';
const userSchema = new mongoose_1.Schema({
    user_first_name: { type: String, default: '' },
    user_last_name: { type: String, default: '' },
    user_email: { type: String, required: true },
    user_password: { type: String, required: true }
}, { collection: COLLECTION_NAME, timestamps: true });
const userModel = (0, mongoose_1.model)(DOCUMENT_NAME, userSchema);
exports.default = userModel;
