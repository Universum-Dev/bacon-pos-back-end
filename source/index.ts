import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import express, { Express } from "express";

import routes from "./routes";
import { config } from "./config";
import connection from "./middlewares/db-connection.mw";

const app: Express = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use("/images", express.static("source/assets/images"));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(connection);
app.use("/", routes);

const server = http.createServer(app);
const port = config.server.port || 5002;

server.listen(port, async () => {
  console.log(`[server]: Bacon POS is running at port ${port}`);
});
