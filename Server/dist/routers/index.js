"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => res.json('Xin chào'));
router.use('/v1/api/auth', auth_1.default);
router.use('/v1/api/user', user_1.default);
exports.default = router;
