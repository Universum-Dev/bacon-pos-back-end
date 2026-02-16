"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
const express_1 = require("express");
const config_1 = require("../config");
const utils_1 = require("../utils");
const requests_db_1 = require("../db/requests.db");
const appRouter = (0, express_1.Router)();
appRouter.get("/health-check", (req, res) => res.send("Bacon POS local Back End is working"));
appRouter.post("/ping", async (req, res) => {
    console.log("--- CONNECTION STARTED ---");
    const { cipherText, iv } = req.body;
    console.log({ cipherText, iv });
    try {
        const key = crypto_js_1.default.SHA256(config_1.config.server.secret || "");
        const cipherParams = crypto_js_1.default.lib.CipherParams.create({
            ciphertext: crypto_js_1.default.enc.Base64.parse(cipherText),
        });
        const bytes = crypto_js_1.default.AES.decrypt(cipherParams, key, {
            iv: crypto_js_1.default.enc.Base64.parse(iv),
            mode: crypto_js_1.default.mode.CBC,
            padding: crypto_js_1.default.pad.Pkcs7,
        });
        const plaintext = bytes.toString(crypto_js_1.default.enc.Utf8);
        const decryptedData = JSON.parse(plaintext);
        console.log("decryptedData", decryptedData);
        const dataIsNotExpired = (0, utils_1.checkDataExpiration)(decryptedData.timestampOfData, "two-minutes");
        console.log("dataIsNotExpired", dataIsNotExpired);
        if (dataIsNotExpired) {
            const [accountData] = await (0, requests_db_1.getAccountData)({
                UMerchantNumber: decryptedData.UMerchantNumber,
            });
            if (accountData) {
                return res.status(200).send({ ...accountData });
            }
            console.log("--- ERROR PING IP ADDRESS. ACCOUNT NOT FOUND ---");
            return res.status(404).send("Not Found");
        }
        console.log("--- ERROR PING IP ADDRESS. TOKEN EXPIRED ---");
        return res.status(401).send("Token expired");
    }
    catch (error) {
        console.log("Error ping", error);
        return res.status(500).send("Server error. Encryption failed.");
    }
});
exports.default = appRouter;
