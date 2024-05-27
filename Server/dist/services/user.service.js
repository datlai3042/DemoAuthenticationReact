"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_response_1 = require("../Code/error.response");
const user_model_1 = __importDefault(require("../models/user.model"));
const dataResponse_1 = require("../utils/dataResponse");
class UserService {
    static async getMe(req, res, next) {
        const { user } = req;
        return { user: (0, dataResponse_1.omit)(user?.toObject(), ['user_password']) };
    }
    static async updateInfo(req, res, next) {
        const { user } = req;
        const { form } = req.body;
        const userUpdateQuery = { _id: user?._id };
        const userUpdate = {
            $set: {
                user_email: form.user_email,
                user_first_name: form.user_first_name,
                user_last_name: form.user_last_name
            }
        };
        const userUpdateOption = { new: true, upsert: true };
        const updateUserDoc = await user_model_1.default.findOneAndUpdate(userUpdateQuery, userUpdate, userUpdateOption);
        if (!updateUserDoc)
            throw new error_response_1.BadRequestError({ metadata: 'Update thông tin không thành công' });
        return { user: (0, dataResponse_1.omit)(user?.toObject(), ['user_password']) };
    }
}
exports.default = UserService;
