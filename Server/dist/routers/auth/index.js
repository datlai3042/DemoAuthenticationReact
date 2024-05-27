"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../../controllers/auth.controller"));
const asyncHandler_1 = require("../../helper/asyncHandler");
const authentication_1 = __importDefault(require("../../middlewares/authentication"));
const authRouter = (0, express_1.Router)();
authRouter.post('/register', (0, asyncHandler_1.asyncHandler)(auth_controller_1.default.register));
authRouter.post('/login', (0, asyncHandler_1.asyncHandler)(auth_controller_1.default.login));
authRouter.use(authentication_1.default);
authRouter.post('/logout', (0, asyncHandler_1.asyncHandler)(auth_controller_1.default.logout));
authRouter.post('/refresh-token', (0, asyncHandler_1.asyncHandler)(auth_controller_1.default.refresh_token));
exports.default = authRouter;
