import { dbConnection } from "../db/connection.db";
import { Request, Response, NextFunction } from "express";

const connection = async (req: Request, res: Response, next: NextFunction) => {
  await dbConnection();
  next();
};

export default connection;
