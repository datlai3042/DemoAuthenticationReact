"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class MongoConnect {
    static connect;
    static async ConnectDb() {
        const mongo_uri = process.env.MONGO_URI;
        if (!MongoConnect.connect) {
            MongoConnect.connect = mongoose_1.default.connect(mongo_uri);
            MongoConnect.connect
                .then(() => console.log('Kết nối mongoDb thành công'))
                .catch((e) => console.log(`Kết nối mongoDb thất bật error::${e}`));
            return MongoConnect.connect;
        }
        return MongoConnect.connect;
    }
}
exports.default = MongoConnect;
