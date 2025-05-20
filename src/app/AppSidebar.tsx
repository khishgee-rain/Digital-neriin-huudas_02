"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronRight, LogOut } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)
  const [companyId, setCompanyId] = useState<string | null>(null)

  useEffect(() => {
    const savedRole = localStorage.getItem("role")
    const savedCompanyId = localStorage.getItem("companyId")
    console.log("Saved Role:", savedRole)
    console.log("Saved Company ID:", savedCompanyId)
    setRole(savedRole ? savedRole.toLowerCase() : null) // Том үсгийг жижиг болгоно
    setCompanyId(savedCompanyId)
  }, [])


  const handleLogout = () => {
    localStorage.clear()
    router.push("/auth/login")
  }

  if (role === null) {
    return (
      <aside className="w-64 h-screen border-r bg-white flex items-center justify-center">
        <p className="text-gray-500">Ачааллаж байна...</p>
      </aside>
    )
  }

  const masterNavItems = [
    { label: "Хянах самбар", href: "/dashboard" },
    { label: "Компани", href: "/companies" },
    { label: "Хувь хэрэглэгчид", href: "/members" },
  ]

  const navItems =
    role === "master"
      ? masterNavItems
      : (role === "admin" || role === "company") && companyId
      ? [
          { label: "Хянах самбар", href: "/dashboard" },
          {
            label: "Миний компанийн хэрэглэгчид",
            href: `/companies/${companyId}`,
          },
        ]
      : role === "user"
      ? [{ label: "Миний хянах самбар", href: "/dashboard" }]
      : []

  return (
    <aside className="w-64 h-screen border-r bg-white flex flex-col justify-between">
      <div className="p-4">
        <ScrollArea className="h-[calc(100vh-200px)] pr-2">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link href={item.href} key={item.label}>
                  <div
                    className={`flex items-center justify-between w-full px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition
                      ${isActive ? "bg-indigo-100 text-indigo-700 font-semibold" : "text-black hover:bg-gray-100"}`}
                  >
                    <span>{item.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </div>
                </Link>
              )
            })}
          </nav>
        </ScrollArea>
      </div>

      <div className="p-4">
        <ScrollArea className="h-[calc(100vh-200px)] pr-2">
          <nav className="space-y-2">
            <div className="space-y-1">
              <Link href="/settings">
                <div className="flex items-center justify-between w-full px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-100">
                  <span>Settings</span>
                </div>
              </Link>
              <Link href="/help">
                <div className="flex items-center justify-between w-full px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-100">
                  <span>Help</span>
                </div>
              </Link>
            </div>
            <div className="px-4 py-4 border-t flex-shrink-0 mt-auto">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-semibold py-3"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Гарах
              </Button>
            </div>
          </nav>
        </ScrollArea>
      </div>
    </aside>
  )
}
