import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// Upload dir inside public
const uploadDir = path.join(process.cwd(), "public/schoolImages");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const imageFile = formData.get("image");

    let filename = null;

    if (imageFile && typeof imageFile === "object") {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      filename = `${uuidv4()}-${imageFile.name}`;
      fs.writeFileSync(path.join(uploadDir, filename), buffer);
    }

    const db = await getDB();
    await db.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, filename, email_id]
    );

    return NextResponse.json({ message: "School added successfully!" });
  } catch (error) {
    console.error("Error adding school:", error);
    return NextResponse.json({ error: "Failed to add school" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDB();
    const [rows] = await db.query("SELECT * FROM schools ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json(
      { error: "Failed to fetch schools" },
      { status: 500 }
    );
  }
}
