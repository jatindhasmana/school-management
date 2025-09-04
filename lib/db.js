// lib/db.js
import mysql from "mysql2/promise";

let pool;
export function getDB() {
  if (!pool) {
    const useSSL = process.env.DB_SSL === "true";
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "school_management",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ...(useSSL ? { ssl: { rejectUnauthorized: false } } : {}),
    });
  }
  return pool;
}
