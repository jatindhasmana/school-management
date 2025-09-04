// lib/db.js
import mysql from "mysql2/promise";

let pool;
export function getDB() {
  if (!pool) {
    const host = process.env.DB_HOST || process.env.MYSQLHOST;
    const port = Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306);
    const user = process.env.DB_USER || process.env.MYSQLUSER || "root";
    const password = process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || "";
    const database = process.env.DB_NAME || process.env.MYSQLDATABASE || "railway";
    const useSSL = (process.env.DB_SSL || "true").toLowerCase() === "true";

    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 10000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      ...(useSSL ? { ssl: { rejectUnauthorized: false } } : {}),
    });
  }
  return pool;
}
