"use client"

import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CompanyPage() {
  const { id } = useParams()
  const [role, setRole] = useState<string | null>(null)
  const [companyId, setCompanyId] = useState<string | null>(null)

  interface Company {
    id: string
    name: string
    logo?: string
    members?: number
    expired?: string
    cards?: string
  }

  const [companies, setCompanies] = useState<Company[]>([])
  const [name, setName] = useState("")
  const [logo, setLogo] = useState("")
  const [fileName, setFileName] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Admin info
  const [adminEmail, setAdminEmail] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [adminName, setAdminName] = useState("")

  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedRole = localStorage.getItem("role")
    const savedCompanyId = localStorage.getItem("companyId")
    setRole(savedRole)
    setCompanyId(savedCompanyId)
  }, [])

  useEffect(() => {
    fetch("http://localhost:3001/companies")
      .then((res) => res.json())
      .then((data) => {
        console.log("Компани API response:", data)  // <- Энд хараарай
        setCompanies(data)
      })
      .catch((err) => console.error("Failed to fetch companies:", err))
  }, [])
  

  if (role === "regular" && id !== companyId) {
    return <div className="p-6 text-red-500">Та энэ компанийн мэдээллийг харах эрхгүй!</div>
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)

    const reader = new FileReader()
    reader.onloadend = () => {
      setLogo(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleAddCompany = async () => {
    if (!name.trim()) return alert("Компанийн нэр хоосон байна!")
    if (!logo) return alert("Лого оруулна уу!")
    if (!adminEmail || !adminPassword || !adminName) {
      return alert("Админ хэрэглэгчийн мэдээллийг бүрэн бөглөнө үү.")
    }

    try {
      const token = localStorage.getItem("authToken")
      const res = await fetch("http://localhost:3001/companies/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          logo,
          adminEmail,
          adminPassword,
          adminName,
        }),
      })

      if (!res.ok) throw new Error(`Failed to add company: ${res.statusText}`)
      const { company } = await res.json()
      setCompanies((prev) => [...prev, company])
      setName("")
      setLogo("")
      setFileName("")
      setAdminEmail("")
      setAdminPassword("")
      setAdminName("")
      setShowForm(false)
      nameInputRef.current?.focus()
    } catch (err) {
      console.error("Error:", err)
      alert("Компани нэмэхэд алдаа гарлаа.")
    }
  }

  const totalCompanies = companies.length
  const totalMembers = companies.reduce((sum, c) => sum + (c.members ?? 0), 0)

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold">Компани</h1>
        <Button
          size="lg"
          className="gap-2"
          style={{ backgroundColor: "#3D4FF4", color: "white" }}
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="w-5 h-5" />
          Компани нэмэх
        </Button>
      </div>

      <div className="flex space-x-4 text-muted-foreground text-sm border-b pb-2">
        <div>Компани: <span className="font-semibold text-black">{totalCompanies}</span></div>
        <div>Гишүүд: <span className="font-semibold text-black">{totalMembers}</span></div>
      </div>

      {showForm && (
        <div className="border p-4 rounded-md space-y-3">
          <Input
            ref={nameInputRef}
            placeholder="Компанийн нэр"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input type="file" onChange={handleFileChange} />
          {logo && (
            <div className="flex items-center space-x-2">
              <Image
                src={logo}
                alt="logo preview"
                width={40}
                height={40}
                className="rounded-md"
              />
              <span className="text-sm">{fileName}</span>
            </div>
          )}
          <Input
            placeholder="Админ нэр"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
          <Input
            placeholder="Админ и-мэйл"
            type="email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <Input
            placeholder="Админ нууц үг"
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          <Button
            onClick={handleAddCompany}
            style={{ backgroundColor: "#3D4FF4", color: "white" }}
          >
            Нэмэх
          </Button>
        </div>
      )}

      <Input
        placeholder="Компанийн нэрээр хайх"
        className="max-w-md bg-muted"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Нэр</TableHead>
              <TableHead>Гишүүд</TableHead>
              <TableHead>Дуусах дөхсөн</TableHead>
              <TableHead>Карт захиалсан</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="flex items-center space-x-2">
                  <Image
                    src={company.logo || "/default-logo.png"}
                    alt={company.name}
                    width={32}
                    height={32}
                    className="rounded-md object-cover"
                  />
                  <Link href={`/companies/${company.id}`} className="font-medium hover:underline">
                    {company.name}
                  </Link>
                </TableCell>
                <TableCell>{company.members ?? "--"}</TableCell>
                <TableCell>{company.expired ?? "--"}</TableCell>
                <TableCell>{company.cards ?? "--"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
