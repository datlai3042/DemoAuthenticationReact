"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
const asyncHandler_1 = require("../../helper/asyncHandler");
const authentication_1 = __importDefault(require("../../middlewares/authentication"));
const userRouter = (0, express_1.Router)();
userRouter.use(authentication_1.default);
userRouter.get('/get-me', (0, asyncHandler_1.asyncHandler)(user_controller_1.default.getMe));
userRouter.post('/update-info', (0, asyncHandler_1.asyncHandler)(user_controller_1.default.updateInfo));
exports.default = userRouter;
