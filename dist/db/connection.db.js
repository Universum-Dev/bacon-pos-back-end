"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
const dbConnection = async () => {
    try {
        if (cached.conn) {
            console.log("Conexion cacheada");
            return cached.conn;
        }
        if (!cached.promise) {
            const connectionOptions = {
                socketTimeoutMS: 30000,
            };
            cached.promise = mongoose_1.default
                .connect(config_1.config.mongo.connectionUri, connectionOptions)
                .then(() => {
                console.log("DB Online");
            })
                .catch((err) => {
                console.error("Error connecting to mongo", err);
            });
        }
        cached.conn = (await cached.promise);
        return cached.conn;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error a la hora de inicializad DB");
    }
};
exports.dbConnection = dbConnection;
