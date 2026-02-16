"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_db_1 = require("../db/connection.db");
const connection = async (req, res, next) => {
    await (0, connection_db_1.dbConnection)();
    next();
};
exports.default = connection;
