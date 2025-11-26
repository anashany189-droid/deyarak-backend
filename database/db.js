import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db;

const connectDB = async () => {
  if (!db) {
    db = await open({
      filename: "./database/deyarak.db",
      driver: sqlite3.Database
    });
  }
  return db;
};

export default await connectDB();
