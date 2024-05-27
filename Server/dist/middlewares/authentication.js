"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEADER = void 0;
const mongoose_1 = require("mongoose");
const error_response_1 = require("../Code/error.response");
const asyncHandler_1 = require("../helper/asyncHandler");
const keyStore_model_1 = __importDefault(require("../models/keyStore.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const token_1 = require("../utils/token");
exports.HEADER = {
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
};
const authentication = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const client_id = req.cookies['client_id'];
    if (!client_id)
        throw new error_response_1.BadRequestError({ metadata: 'CLIENT::Không truyền user_id' });
    const access_token = req.cookies['access_token'];
    if (!access_token)
        throw new error_response_1.ForbiddenError({ metadata: 'Không tìm thấy access_token' });
    const user = await user_model_1.default.findOne({ _id: new mongoose_1.Types.ObjectId(client_id) });
    if (!user)
        throw new error_response_1.ForbiddenError({ metadata: 'Không tìm thấy user' });
    const force = req.body.force;
    if (force && req.originalUrl === '/v1/api/auth/logout') {
        req.user = user;
        return next();
    }
    const keyStore = await keyStore_model_1.default.findOne({ user_id: user._id });
    if (!keyStore)
        throw new error_response_1.ForbiddenError({ metadata: 'Không tìm thấy key của user' });
    //CASE: Auth refresh_token
    if (req.originalUrl === '/v1/api/auth/refresh-token') {
        const refresh_token = req.cookies['refresh_token'];
        if (!refresh_token)
            return next(new error_response_1.AuthFailedError({ metadata: 'Không tìm thấy refresh_token' }));
        return (0, token_1.verifyRefreshToken)({
            client_id,
            user,
            keyStore,
            token: refresh_token,
            key: keyStore.private_key,
            req,
            res,
            next
        });
    }
    //CASE: Auth access_token
    if (access_token) {
        return (0, token_1.verifyAccessToken)({
            client_id,
            user,
            keyStore,
            token: access_token,
            key: keyStore.public_key,
            req,
            res,
            next
        });
    }
});
exports.default = authentication;
