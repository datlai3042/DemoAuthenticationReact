"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OK = exports.ResponseSuccess = exports.CREATE = void 0;
const status_code_1 = __importDefault(require("./status_code"));
const reason_code_1 = __importDefault(require("./reason_code"));
class ResponseSuccess {
    code;
    message;
    metadata;
    constructor({ code = status_code_1.default.OK, message = reason_code_1.default.OK, metadata }) {
        this.code = code;
        this.message = message;
        this.metadata = metadata;
    }
    send(res) {
        return res.json(this);
    }
}
exports.ResponseSuccess = ResponseSuccess;
class CREATE extends ResponseSuccess {
    constructor({ code = status_code_1.default.CREATED, message = reason_code_1.default.CREATED, metadata = {} }) {
        super({ code, message, metadata });
    }
}
exports.CREATE = CREATE;
class OK extends ResponseSuccess {
    constructor({ code = status_code_1.default.OK, message = reason_code_1.default.OK, metadata = {} }) {
        super({ code, message, metadata });
    }
}
exports.OK = OK;
