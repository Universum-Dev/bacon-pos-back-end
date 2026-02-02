import mongoose, { Connection } from "mongoose";

import { config } from "../config";

let cached: { conn: Connection | null; promise: Promise<unknown> | null } = (
  global as any
).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const dbConnection = async () => {
  try {
    if (cached.conn) {
      console.log("Conexion cacheada");
      return cached.conn;
    }

    if (!cached.promise) {
      const connectionOptions = {
        socketTimeoutMS: 30000,
      };

      cached.promise = mongoose
        .connect(config.mongo.connectionUri, connectionOptions)
        .then(() => {
          console.log("DB Online");
        })
        .catch((err: any) => {
          console.error("Error connecting to mongo", err);
        });
    }

    cached.conn = (await cached.promise) as Connection;
    return cached.conn;
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializad DB");
  }
};
