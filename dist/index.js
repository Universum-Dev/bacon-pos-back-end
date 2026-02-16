"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const db_connection_mw_1 = __importDefault(require("./middlewares/db-connection.mw"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use("/images", express_1.default.static("source/assets/images"));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use(db_connection_mw_1.default);
app.use("/", routes_1.default);
const server = http_1.default.createServer(app);
const port = config_1.config.server.port || 5002;
server.listen(port, async () => {
    console.log(`[server]: Bacon POS is running at port ${port}`);
});
