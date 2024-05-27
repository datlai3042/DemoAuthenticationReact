"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reason_code_1 = __importDefault(require("../Code/reason_code"));
const status_code_1 = __importDefault(require("../Code/status_code"));
const errorHandler = (error, req, res, next) => {
    console.log('errroHandle', JSON.parse(JSON.stringify(error.stack || 'Not')));
    const code = error.code ? error.code : status_code_1.default.INTERNAL_SERVER_ERROR;
    const message = error.message ? error.message : reason_code_1.default.INTERNAL_SERVER_ERROR;
    const metadata = error.metadata ? error.metadata : null;
    return res.status(code).send({ code, message, metadata });
};
exports.default = errorHandler;
