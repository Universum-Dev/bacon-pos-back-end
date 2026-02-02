import dotenv from "dotenv";
dotenv.config();

export const config = {
  mongo: {
    connectionUri: process.env.MONGO_URI || "",
  },
  server: {
    port: process.env.PORT,
    secret: process.env.SECRET,
  },
};
