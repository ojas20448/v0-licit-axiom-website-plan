"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lock, LogOut, Plus, Trash2, Edit, FileText, Briefcase, Upload, ImageIcon, AlertCircle } from "lucide-react"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [authError, setAuthError] = useState("")
  const [authLoading, setAuthLoading] = useState(false)

  // Data State
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [careers, setCareers] = useState<any[]>([])
  const [loadingData, setLoadingData] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const [uploadingImage, setUploadingImage] = useState(false)

  // Blog Form State
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null)
  const [blogForm, setBlogForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "Licit Axiom",
    authorSlug: "licit-axiom",
    category: "Legal Insights",
    image: "/modern-law-office-interior-dark-elegant.jpg",
    date: new Date().toISOString().split("T")[0],
  })

  // Career Form State
  const [editingCareerId, setEditingCareerId] = useState<string | null>(null)
  const [careerForm, setCareerForm] = useState({
    title: "",
    department: "Corporate Law",
    location: "New Delhi, India",
    type: "Full-time",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
  })

  useEffect(() => {
    // Check if session token exists
    const token = document.cookie.includes("licit_admin_token=authenticated")
    if (token) {
      setIsAuthenticated(true)
      fetchData()
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError("")

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Invalid credentials")
      }

      setIsAuthenticated(true)
      fetchData()
    } catch (err: any) {
      setAuthError(err.message || "Login failed")
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    setIsAuthenticated(false)
  }

  const fetchData = async () => {
    setLoadingData(true)
    try {
      const [blogRes, careerRes] = await Promise.all([
        fetch("/api/admin/blog"),
        fetch("/api/admin/careers"),
      ])
      if (blogRes.ok) setBlogPosts(await blogRes.json())
      if (careerRes.ok) setCareers(await careerRes.json())
    } catch (err) {
      console.error("Error loading data:", err)
    } finally {
      setLoadingData(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    setStatusMessage("Uploading photo...")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Upload failed")
      const data = await res.json()

      setBlogForm((prev) => ({ ...prev, image: data.url }))
      setStatusMessage("Photo uploaded successfully!")
    } catch (err: any) {
      setStatusMessage(`Error uploading photo: ${err.message}`)
    } finally {
      setUploadingImage(false)
    }
  }

  // Blog Actions
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatusMessage("Saving blog post...")

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingBlogId,
          ...blogForm,
        }),
      })

      if (!res.ok) throw new Error("Failed to save blog post")
      const data = await res.json()
      setBlogPosts(data.posts)
      setStatusMessage("Blog post saved successfully!")
      resetBlogForm()
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`)
    }
  }

  const handleEditBlog = (post: any) => {
    setEditingBlogId(post.id)
    setBlogForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author || "Licit Axiom",
      authorSlug: post.authorSlug || "licit-axiom",
      category: post.category || "Legal Insights",
      image: post.image || "/modern-law-office-interior-dark-elegant.jpg",
      date: post.date || new Date().toISOString().split("T")[0],
    })
  }

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        const data = await res.json()
        setBlogPosts(data.posts)
        setStatusMessage("Blog post deleted.")
      }
    } catch (err) {
      console.error("Failed to delete post:", err)
    }
  }

  const resetBlogForm = () => {
    setEditingBlogId(null)
    setBlogForm({
      title: "",
      excerpt: "",
      content: "",
      author: "Licit Axiom",
      authorSlug: "licit-axiom",
      category: "Legal Insights",
      image: "/modern-law-office-interior-dark-elegant.jpg",
      date: new Date().toISOString().split("T")[0],
    })
  }

  // Career Actions
  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatusMessage("Saving career opening...")

    try {
      const res = await fetch("/api/admin/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingCareerId,
          ...careerForm,
        }),
      })

      if (!res.ok) throw new Error("Failed to save career opening")
      const data = await res.json()
      setCareers(data.careers)
      setStatusMessage("Career opening saved successfully!")
      resetCareerForm()
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`)
    }
  }

  const handleEditCareer = (item: any) => {
    setEditingCareerId(item.id)
    setCareerForm({
      title: item.title,
      department: item.department,
      location: item.location,
      type: item.type,
      description: item.description,
      responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities.join("\n") : item.responsibilities,
      requirements: Array.isArray(item.requirements) ? item.requirements.join("\n") : item.requirements,
      benefits: Array.isArray(item.benefits) ? item.benefits.join("\n") : item.benefits,
    })
  }

  const handleDeleteCareer = async (id: string) => {
    if (!confirm("Are you sure you want to delete this career listing?")) return
    try {
      const res = await fetch(`/api/admin/careers?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        const data = await res.json()
        setCareers(data.careers)
        setStatusMessage("Career listing deleted.")
      }
    } catch (err) {
      console.error("Failed to delete career:", err)
    }
  }

  const resetCareerForm = () => {
    setEditingCareerId(null)
    setCareerForm({
      title: "",
      department: "Corporate Law",
      location: "New Delhi, India",
      type: "Full-time",
      description: "",
      responsibilities: "",
      requirements: "",
      benefits: "",
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex flex-1 items-center justify-center py-16 px-4">
          <Card className="w-full max-w-md border-border bg-card shadow-2xl">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Lock className="h-7 w-7" />
              </div>
              <CardTitle className="font-serif text-2xl font-bold">Licit Axiom Admin Login</CardTitle>
              <CardDescription>Enter your credentials to access the Content Management Portal.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {authError && (
                  <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {authError}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={authLoading}>
                  {authLoading ? "Authenticating..." : "Sign In to Admin Portal"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 md:px-6">
        {/* Admin Header Bar */}
        <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Licit Axiom Content Console</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage Blog Insights, Cover Photos, and Career Opportunities live on your website.</p>
          </div>
          <Button variant="outline" className="self-start md:self-auto" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>

        {statusMessage && (
          <div className="mt-4 rounded-md bg-accent/10 border border-accent/20 p-4 text-sm text-accent-foreground flex items-center justify-between">
            <span>{statusMessage}</span>
            <button onClick={() => setStatusMessage("")} className="text-xs font-semibold hover:underline">Dismiss</button>
          </div>
        )}

        {/* Admin Tabs */}
        <Tabs defaultValue="blog" className="mt-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Blog Posts ({blogPosts.length})
            </TabsTrigger>
            <TabsTrigger value="careers" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Career Openings ({careers.length})
            </TabsTrigger>
          </TabsList>

          {/* BLOG POSTS TAB */}
          <TabsContent value="blog" className="mt-6 space-y-8">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-xl font-serif">
                  {editingBlogId ? "Edit Blog Post" : "Create New Blog Post"}
                </CardTitle>
                <CardDescription>Publish thought leadership, legal insights, and cover photos to the blog page.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBlogSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="blogTitle">Title *</Label>
                      <Input
                        id="blogTitle"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        placeholder="e.g. Key Amendments in Commercial Arbitration 2026"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        placeholder="e.g. Arbitration, M&A, IPR, Tax"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="author">Author Name</Label>
                      <Input
                        id="author"
                        value={blogForm.author}
                        onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                        placeholder="Author name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Publish Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={blogForm.date}
                        onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Cover Photo Uploader Field */}
                  <div className="space-y-2 rounded-lg border border-border p-4 bg-muted/20">
                    <Label htmlFor="coverPhoto" className="font-semibold text-foreground flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-primary" />
                      Upload Cover Photo / Image
                    </Label>
                    <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                      <div className="space-y-2">
                        <div className="flex gap-2 items-center">
                          <Input
                            id="photoFile"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                            className="bg-card text-xs cursor-pointer"
                          />
                          {uploadingImage && <span className="text-xs text-muted-foreground animate-pulse">Uploading...</span>}
                        </div>
                        <Input
                          id="imageUrl"
                          value={blogForm.image}
                          onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                          placeholder="Or paste Image URL (e.g. /images/uploads/my-photo.jpg)"
                          className="bg-card text-xs font-mono"
                        />
                      </div>
                      {blogForm.image && (
                        <div className="relative h-20 w-32 shrink-0 rounded-md overflow-hidden border border-border bg-card">
                          <img
                            src={blogForm.image}
                            alt="Cover Preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Short Excerpt (Summary) *</Label>
                    <Textarea
                      id="excerpt"
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      placeholder="Brief 1-2 sentence overview shown on blog cards..."
                      rows={2}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blogContent">Full Article Content (Markdown supported) *</Label>
                    <Textarea
                      id="blogContent"
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      placeholder="Write your article content here..."
                      rows={8}
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit">
                      <Plus className="mr-2 h-4 w-4" />
                      {editingBlogId ? "Update Post" : "Publish Blog Post"}
                    </Button>
                    {editingBlogId && (
                      <Button type="button" variant="outline" onClick={resetBlogForm}>
                        Cancel Edit
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* List Existing Blog Posts */}
            <div>
              <h3 className="font-serif text-xl font-semibold mb-4">Existing Blog Posts</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="bg-card flex flex-col justify-between overflow-hidden">
                    {post.image && (
                      <div className="h-40 w-full overflow-hidden bg-muted">
                        <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>{post.category || "General"}</span>
                        <span>{post.date}</span>
                      </div>
                      <CardTitle className="text-lg font-serif">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-xs text-muted-foreground">By {post.author}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditBlog(post)}>
                            <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteBlog(post.id)}>
                            <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* CAREER OPENINGS TAB */}
          <TabsContent value="careers" className="mt-6 space-y-8">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-xl font-serif">
                  {editingCareerId ? "Edit Career Opening" : "Create New Job Opening"}
                </CardTitle>
                <CardDescription>Post recruitment notices and internship opportunities.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCareerSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="jobTitle">Job Title *</Label>
                      <Input
                        id="jobTitle"
                        value={careerForm.title}
                        onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })}
                        placeholder="e.g. Senior Associate - Litigation"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department *</Label>
                      <Input
                        id="department"
                        value={careerForm.department}
                        onChange={(e) => setCareerForm({ ...careerForm, department: e.target.value })}
                        placeholder="e.g. Corporate Law / Litigation"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={careerForm.location}
                        onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })}
                        placeholder="New Delhi, India"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Job Type</Label>
                      <Input
                        id="type"
                        value={careerForm.type}
                        onChange={(e) => setCareerForm({ ...careerForm, type: e.target.value })}
                        placeholder="Full-time, Part-time, Internship"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="careerDesc">Description *</Label>
                    <Textarea
                      id="careerDesc"
                      value={careerForm.description}
                      onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })}
                      placeholder="Role summary and overview..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
                      <Textarea
                        id="responsibilities"
                        value={careerForm.responsibilities}
                        onChange={(e) => setCareerForm({ ...careerForm, responsibilities: e.target.value })}
                        placeholder="Lead due diligence&#10;Draft petitions"
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="requirements">Requirements (one per line)</Label>
                      <Textarea
                        id="requirements"
                        value={careerForm.requirements}
                        onChange={(e) => setCareerForm({ ...careerForm, requirements: e.target.value })}
                        placeholder="LL.B. degree&#10;3+ years experience"
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="benefits">Benefits (one per line)</Label>
                      <Textarea
                        id="benefits"
                        value={careerForm.benefits}
                        onChange={(e) => setCareerForm({ ...careerForm, benefits: e.target.value })}
                        placeholder="Competitive stipend&#10;Mentorship"
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit">
                      <Plus className="mr-2 h-4 w-4" />
                      {editingCareerId ? "Update Job Opening" : "Publish Job Opening"}
                    </Button>
                    {editingCareerId && (
                      <Button type="button" variant="outline" onClick={resetCareerForm}>
                        Cancel Edit
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* List Existing Careers */}
            <div>
              <h3 className="font-serif text-xl font-semibold mb-4">Current Career Listings</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {careers.map((job) => (
                  <Card key={job.id} className="bg-card flex flex-col justify-between">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>{job.department}</span>
                        <span>{job.type}</span>
                      </div>
                      <CardTitle className="text-lg font-serif">{job.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-xs text-muted-foreground">{job.location}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditCareer(job)}>
                            <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteCareer(job.id)}>
                            <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
