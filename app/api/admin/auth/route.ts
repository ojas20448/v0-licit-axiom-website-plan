import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (username === "licitaxiom" && password === "licitaxiom") {
      const response = NextResponse.json({ success: true, message: "Authenticated successfully" })
      response.cookies.set("licit_admin_token", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
      return response
    }

    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Authentication failed" }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" })
  response.cookies.delete("licit_admin_token")
  return response
}
