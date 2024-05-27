"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.ForbiddenError = exports.AuthFailedError = exports.BadRequestError = exports.ResponseError = void 0;
const reason_code_1 = __importDefault(require("./reason_code"));
const status_code_1 = __importDefault(require("./status_code"));
class ResponseError extends Error {
    code;
    message;
    metadata;
    constructor({ code = status_code_1.default.INTERNAL_SERVER_ERROR, message = reason_code_1.default.INTERNAL_SERVER_ERROR, metadata }) {
        super(message);
        this.code = code;
        this.message = message;
        this.metadata = metadata;
    }
}
exports.ResponseError = ResponseError;
class BadRequestError extends ResponseError {
    constructor({ code = status_code_1.default.BAD_REQUEST, message = reason_code_1.default.BAD_REQUEST, metadata = '' }) {
        super({ code, message, metadata });
    }
}
exports.BadRequestError = BadRequestError;
class AuthFailedError extends ResponseError {
    constructor({ code = status_code_1.default.UNAUTHORIZED, message = reason_code_1.default.UNAUTHORIZED, metadata = '' }) {
        super({ code, message, metadata });
    }
}
exports.AuthFailedError = AuthFailedError;
class ForbiddenError extends ResponseError {
    constructor({ code = status_code_1.default.FORBIDDEN, message = reason_code_1.default.FORBIDDEN, metadata = '' }) {
        super({ code, message, metadata });
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends ResponseError {
    constructor({ code = status_code_1.default.NOT_FOUND, message = reason_code_1.default.NOT_FOUND, metadata = '' }) {
        super({ code, message, metadata });
    }
}
exports.NotFoundError = NotFoundError;
