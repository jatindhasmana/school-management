export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("POST /api/schools body:", body);   
    const { name, address, city, state, contact, email_id, image } = body;

    const db = await getDB();
    await db.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, image, email_id]
    );

    return NextResponse.json({ message: "School added successfully!" });
  } catch (error) {
    console.error("POST /api/schools error:", error); 
    return NextResponse.json({ error: error.message || "Failed to add school" }, { status: 500 });
  }
}
