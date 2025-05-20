"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Имэйл болон нууц үгээ оруулна уу")
      return
    }

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Нэвтрэхэд алдаа гарлаа")
        return
      }

      // Save user info
      localStorage.setItem("authToken", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("role", data.user.role)
      if (data.user.companyId) {
        localStorage.setItem("companyId", data.user.companyId)
      }

      router.push("/dashboard")
    } catch (err) {
      console.error("Login error:", err)
      setError("Сервертэй холбогдож чадсангүй")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Системд нэвтрэх</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded-md">
            {error}
          </div>
        )}

        <div className="mb-4">
          <Label htmlFor="email">Имэйл хаяг</Label>
          <Input
            id="email"
            type="email"
            placeholder="жишээ@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="password">Нууц үг</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Нэвтрэх
        </Button>

        <div className="mt-4 text-center text-sm text-gray-600">
          Та бүртгэлгүй бол админтай холбогдоно уу
        </div>
      </form>
    </div>
  )
}
