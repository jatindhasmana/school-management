// app/api/dbcheck/route.js
export const runtime = "nodejs";           // ensure not Edge

import { getDB } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDB();
    const [rows] = await db.query("SELECT 1 AS ok");
    return new Response(JSON.stringify({ ok: true, rows }), { status: 200 });
  } catch (err) {
    console.error("DBCHECK ERROR:", err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}
