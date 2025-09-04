export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, address, city, state, contact, email_id, image } = body;

    const db = await getDB();
    await db.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, image, email_id]
    );

    return NextResponse.json({ message: "School added successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add school" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDB();
    const [rows] = await db.query("SELECT * FROM schools ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch schools" }, { status: 500 });
  }
}
