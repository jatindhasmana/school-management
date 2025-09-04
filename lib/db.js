
import mysql from "mysql2/promise";

let pool;

export function getDB() {
  if (!pool) {
   
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_NAME;

    if (!host || !user || !database) {
      throw new Error("DB env vars missing (DB_HOST/DB_USER/DB_NAME).");
    }

    const useSSL = (process.env.DB_SSL || "").toLowerCase() === "true";

    pool = mysql.createPool({
      host,
      port,                    
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,

      
      connectTimeout: 10_000,  
      acquireTimeout: 10_000,   
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,

      // Railway from Vercel usually needs SSL
      ...(useSSL ? { ssl: { rejectUnauthorized: false } } : {}),
    });
  }
  return pool;
}
