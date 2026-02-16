"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountData = void 0;
const models_1 = require("./models");
const getAccountData = async (queryToSearch) => {
    try {
        const accountData = await models_1.Account.find(queryToSearch).lean().exec();
        return accountData;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getAccountData = getAccountData;
