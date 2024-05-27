"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../Code/success.response");
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    static async getMe(req, res, next) {
        return new success_response_1.OK({ metadata: await user_service_1.default.getMe(req, res, next) }).send(res);
    }
    static async updateInfo(req, res, next) {
        return new success_response_1.OK({ metadata: await user_service_1.default.updateInfo(req, res, next) }).send(res);
    }
}
exports.default = UserController;
