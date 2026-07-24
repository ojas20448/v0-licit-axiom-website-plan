import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const careersFilePath = path.join(process.cwd(), "data", "careers.json")

function getCareers() {
  const fileData = fs.readFileSync(careersFilePath, "utf-8")
  return JSON.parse(fileData)
}

function saveCareers(careers: any[]) {
  fs.writeFileSync(careersFilePath, JSON.stringify(careers, null, 2), "utf-8")
}

export async function GET() {
  try {
    const careers = getCareers()
    return NextResponse.json(careers)
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to read careers" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, title, department, location, type, description, responsibilities, requirements, benefits } = body

    if (!title || !department || !description) {
      return NextResponse.json({ error: "Title, Department, and Description are required." }, { status: 400 })
    }

    const careers = getCareers()
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")

    const parseList = (val: any) => {
      if (Array.isArray(val)) return val
      if (typeof val === "string") return val.split("\n").map((s) => s.trim()).filter(Boolean)
      return []
    }

    if (id) {
      // Edit existing
      const index = careers.findIndex((c: any) => c.id === id)
      if (index !== -1) {
        careers[index] = {
          ...careers[index],
          title,
          slug,
          department,
          location: location || "New Delhi, India",
          type: type || "Full-time",
          description,
          responsibilities: parseList(responsibilities),
          requirements: parseList(requirements),
          benefits: parseList(benefits),
        }
      } else {
        return NextResponse.json({ error: "Career opening not found" }, { status: 404 })
      }
    } else {
      // Create new
      const newCareer = {
        id: String(Date.now()),
        slug,
        title,
        department,
        location: location || "New Delhi, India",
        type: type || "Full-time",
        description,
        responsibilities: parseList(responsibilities),
        requirements: parseList(requirements),
        benefits: parseList(benefits),
      }
      careers.unshift(newCareer)
    }

    saveCareers(careers)
    return NextResponse.json({ success: true, careers })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save career opening" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Career ID is required" }, { status: 400 })
    }

    let careers = getCareers()
    careers = careers.filter((c: any) => c.id !== id)
    saveCareers(careers)

    return NextResponse.json({ success: true, careers })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete career" }, { status: 500 })
  }
}
