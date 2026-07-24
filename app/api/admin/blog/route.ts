import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const blogFilePath = path.join(process.cwd(), "data", "blog.json")

function getBlogPosts() {
  const fileData = fs.readFileSync(blogFilePath, "utf-8")
  return JSON.parse(fileData)
}

function saveBlogPosts(posts: any[]) {
  fs.writeFileSync(blogFilePath, JSON.stringify(posts, null, 2), "utf-8")
}

export async function GET() {
  try {
    const posts = getBlogPosts()
    return NextResponse.json(posts)
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to read blog posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, title, excerpt, content, author, authorSlug, category, image, date } = body

    if (!title || !content || !excerpt) {
      return NextResponse.json({ error: "Title, Excerpt, and Content are required." }, { status: 400 })
    }

    const posts = getBlogPosts()
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
    const postDate = date || new Date().toISOString().split("T")[0]

    if (id) {
      // Edit existing post
      const index = posts.findIndex((p: any) => p.id === id)
      if (index !== -1) {
        posts[index] = {
          ...posts[index],
          title,
          slug,
          excerpt,
          content,
          author: author || "Licit Axiom",
          authorSlug: authorSlug || "licit-axiom",
          category: category || "General",
          image: image || "/modern-law-office-interior-dark-elegant.jpg",
          date: postDate,
        }
      } else {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
      }
    } else {
      // Create new post
      const newPost = {
        id: String(Date.now()),
        slug,
        title,
        excerpt,
        content,
        author: author || "Licit Axiom",
        authorSlug: authorSlug || "licit-axiom",
        date: postDate,
        category: category || "Legal Insights",
        image: image || "/modern-law-office-interior-dark-elegant.jpg",
      }
      posts.unshift(newPost)
    }

    saveBlogPosts(posts)
    return NextResponse.json({ success: true, posts })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save blog post" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
    }

    let posts = getBlogPosts()
    posts = posts.filter((p: any) => p.id !== id)
    saveBlogPosts(posts)

    return NextResponse.json({ success: true, posts })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete post" }, { status: 500 })
  }
}
