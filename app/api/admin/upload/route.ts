import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public", "images", "uploads")
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    // Clean file name
    const sanitizedFileName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-")
    const fileName = `${Date.now()}-${sanitizedFileName}`
    const filePath = path.join(uploadsDir, fileName)

    fs.writeFileSync(filePath, buffer)

    const publicUrl = `/images/uploads/${fileName}`
    return NextResponse.json({ success: true, url: publicUrl })
  } catch (err: any) {
    console.error("Upload error:", err)
    return NextResponse.json({ error: err.message || "Failed to upload image" }, { status: 500 })
  }
}
