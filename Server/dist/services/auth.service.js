"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const error_response_1 = require("../Code/error.response");
const keyStore_model_1 = __importDefault(require("../models/keyStore.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_2 = require("../utils/bcrypt");
const dataResponse_1 = require("../utils/dataResponse");
const googleOAuth_1 = require("../utils/googleOAuth");
const token_1 = require("../utils/token");
class AuthService {
    static async register(req, res, next) {
        const { user_email, user_password, user_last_name, user_first_name } = req.body;
        console.log('OK');
        if (!user_email || !user_password || !user_first_name || !user_last_name)
            throw new error_response_1.BadRequestError({ metadata: 'Missing Field' });
        const foundEmail = await user_model_1.default.findOne({ user_email });
        if (foundEmail)
            throw new error_response_1.BadRequestError({ metadata: 'Email đã tồn tại' });
        const hashPassword = await (0, bcrypt_2.hassPassword)(user_password);
        const createUser = await user_model_1.default.create({
            user_email: user_email,
            user_password: hashPassword,
            user_first_name: user_first_name,
            user_last_name: user_last_name
        });
        if (!createUser)
            throw new error_response_1.ResponseError({ metadata: 'Không thể đăng kí user do lỗi' });
        const { private_key, public_key } = (0, token_1.generatePaidKey)();
        if (!public_key || !private_key)
            throw new error_response_1.ResponseError({ metadata: 'Server không thể tạo key sercet' });
        const payload = (0, token_1.createPayload)(createUser);
        const token = (0, token_1.generatePaidToken)(payload, { public_key, private_key });
        const code_verify_token = (0, token_1.generateCodeVerifyToken)();
        const { modelKeyQuery, modelKeyUpdate, modelKeyOption } = (0, token_1.fillDataKeyModel)(createUser, public_key, private_key, token.refresh_token, code_verify_token);
        const createKey = await keyStore_model_1.default.findOneAndUpdate(modelKeyQuery, modelKeyUpdate, modelKeyOption);
        if (!createKey)
            throw new error_response_1.ResponseError({ metadata: 'Server không thể tạo model key' });
        (0, dataResponse_1.setCookieResponse)(res, dataResponse_1.oneWeek, 'client_id', createUser._id, { httpOnly: true });
        const expireToken = (0, dataResponse_1.setCookieResponse)(res, dataResponse_1.expriresAT, 'access_token', token.access_token, {
            httpOnly: true
        });
        (0, dataResponse_1.setCookieResponse)(res, dataResponse_1.oneWeek, 'isLogin', 'true');
        (0, dataResponse_1.setCookieResponse)(res, dataResponse_1.oneWeek, 'refresh_token', token.refresh_token, { httpOnly: true });
        return {
            user: (0, dataResponse_1.omit)(createUser.toObject(), ['user_password']),
            token: { access_token: token.access_token, refresh_token: token.refresh_token, code_verify_token },
            expireToken,
            client_id: createUser._id.toString()
        };
    }
    static async login(req, res, next) {
        const { user_email, user_password } = req.body;
        const foundUser = await user_model_1.default.findOne({ user_email });
        if (!foundUser)
            throw new error_response_1.NotFoundError({ metadata: 'Không tìm thấy không tin đăng nhập' });
        const checkPassword = (0, bcrypt_1.compare)(user_password, foundUser?.user_password);
        if (!checkPassword)
            throw new error_response_1.AuthFailedError({ metadata: 'Something wrongs...' });
        const foundKey = await keyStore_model_1.default.findOneAndDelete({ user_id: foundUser._id });
        const { public_key, private_key } = (0, token_1.generatePaidKey)();
        if (!public_key || !private_key)
            throw new error_response_1.ResponseError({ metadata: 'Server không thể tạo key sercet' });
        const payload = (0, token_1.createPayload)(foundUser);
        const { access_token, refresh_token } = (0, token_1.generatePaidToken)(payload, { public_key, private_key });
        const code_verify_token = (0, token_1.generateCodeVerifyToken)();
        const { modelKeyOption, modelKeyUpdate, modelKeyQuery } = (0, token_1.fillDataKeyModel)(foundUser, public_key, private_key, refresh_token, code_verify_token);
        const keyStore = await keyStore_model_1.default.findOneAndUpdate(modelKeyQuery, modelKeyUpdate, modelKeyOption);
        if (!keyStore)
            throw new error_response_1.ResponseError({ metadata: 'Server không thể tạo model key' });
        (0, dataResponse_1.setCookieResponse)(res, dataResponse_1.oneWeek, 'client_id', foundUser._id, { httpOnly: true });
        (0, dataResponse_1.setCookieResponse)(res, dataResponse_1.oneWeek, 'refresh_token', refresh_token, { httpOnly: true });
        (0, dataResponse_1.setCookieResponse)(res, dataResponse_1.oneWeek, 'isLogin', 'true');
        const expireToken = (0, dataResponse_1.setCookieResponse)(res, dataResponse_1.expriresAT, 'access_token', access_token, { httpOnly: true });
        return {
            user: (0, dataResponse_1.omit)(foundUser.toObject(), ['user_password']),
            token: { access_token, refresh_token, code_verify_token },
            expireToken,
            client_id: foundUser._id.toString()
        };
    }
    static async loginWithGoogle(req) {
        const { code } = req.query;
        const token = await (0, googleOAuth_1.getOautGoogleToken)(code);
        const { id_token, access_token } = token;
        const googleUser = await (0, googleOAuth_1.getGoogleUser)({ id_token, access_token });
        const user = googleUser.data;
        if ('verified_email' in googleUser) {
            if (!googleUser.verified_email) {
                new error_response_1.ForbiddenError({ metadata: 'block' });
            }
        }
        const password = Math.random().toString();
        const createUser = user_model_1.default.create({ user_email: googleUser.email, user_password: password });
        return { image: user.picture, name: user.name };
    }
    static async logout(req, res, next) {
        const user = req.user;
        const { force } = req.body;
        if (force) {
            await keyStore_model_1.default.findOneAndDelete({ user_id: user._id });
            return { message: 'Token hết hạn và đẵ buộc phải logout', force };
        }
        await keyStore_model_1.default.findOneAndDelete({ user_id: user._id });
        res.clearCookie('client_id');
        res.clearCookie('refresh_token');
        res.clearCookie('access_token');
        res.clearCookie('isLogin');
        return { message: 'Logout thành công' };
    }
    static async refresh_token(req, res, next) {
        const { refresh_token } = req;
        const user = req.user;
        const { public_key, private_key } = (0, token_1.generatePaidKey)();
        if (!public_key || !private_key)
            throw new error_response_1.ResponseError({ metadata: 'Server không thể tạo key sercet' });
        const payload = (0, token_1.createPayload)(user);
        const { access_token, refresh_token: new_refresh_token } = (0, token_1.generatePaidToken)(payload, {
            public_key,
            private_key
        });
        const code_verify_token = (0, token_1.generateCodeVerifyToken)();
        const keyModelQuery = { user_id: user._id };
        const keyModelUpdate = {
            $set: { refresh_token: new_refresh_token, private_key, public_key, code_verify_token },
            $addToSet: { refresh_token_used: refresh_token }
        };
        const keyModelOption = { new: true, upsert: true };
        const updateKeyModel = await keyStore_model_1.default.findOneAndUpdate(keyModelQuery, keyModelUpdate, keyModelOption);
        console.log({ key: updateKeyModel?.toObject() });
        (0, dataResponse_1.setCookieResponse)(res, dataResponse_1.oneWeek, 'refresh_token', new_refresh_token, { httpOnly: true });
        (0, dataResponse_1.setCookieResponse)(res, dataResponse_1.oneWeek, 'client_id', user._id, { httpOnly: true });
        (0, dataResponse_1.setCookieResponse)(res, dataResponse_1.oneWeek, 'code_verify_token', code_verify_token, { httpOnly: true });
        const expireToken = (0, dataResponse_1.setCookieResponse)(res, dataResponse_1.expriresAT, 'access_token', access_token, { httpOnly: true });
        return {
            user: (0, dataResponse_1.omit)(user.toObject(), ['user_password']),
            token: { access_token, refresh_token: new_refresh_token, code_verify_token },
            expireToken,
            client_id: user._id
        };
    }
}
exports.default = AuthService;
