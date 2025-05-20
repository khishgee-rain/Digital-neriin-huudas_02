"use client"
//company hereglegchid

import { useEffect, useState } from "react"
import { Edit, Key, QrCode, Trash, MoreHorizontal, ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import  Loader  from "@/components/ui/loading"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AddMemberModal from "@/components/ui/AddMemberModal"

interface Member {
  name: string
  title: string 
  email: string
  phone: string
  expired: string
  usage: number
  avatar: string
  id?: number // Хэрвээ member id байгаа бол
}

interface CompanyData {
  id: number
  name: string
  logo: string
  members: Member[]
}

export default function CompanyDetailPage() {
  const router = useRouter()
  const { id } = useParams()
  const [company, setCompany] = useState<CompanyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`http://localhost:3001/companies/${id}`)
        if (!res.ok) throw new Error("Failed to fetch company")
        const data = await res.json()
        setCompany(data)
      } catch (err) {
        console.error(err)
        setCompany(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()
  }, [id])

  if (loading) return <Loader />
  if (!company) return <div className="p-6">Компанийн мэдээлэл олдсонгүй.</div>


  const members = company.members || []
  const today = new Date()
  const total = members.length
  const totalViewedToday = members.filter((m) => m.usage > 0).length
  const nearExpiry = members.filter((m) => {
    const expiredDate = new Date(m.expired)
    const diff = expiredDate.getTime() - today.getTime()
    const daysLeft = diff / (1000 * 60 * 60 * 24)
    return daysLeft <= 3
  }).length

  const handleEdit = (member: Member) => {
    alert(`${member.name} засах товч дарагдлаа`)
  }

  const handleResetPassword = (member: Member) => {
    alert(`${member.email} ийн нууц үгийг сэргээнэ`)
  }

  const handleShowQRCode = (member: Member) => {
    alert(`${member.name} - QR кодыг харуулах`)
  }

  const handleDelete = (member: Member) => {
    const confirmDelete = confirm(`${member.name} гишүүнийг устгах уу?`)
    if (confirmDelete) {
      setCompany((prev) =>
        prev
          ? {
              ...prev,
              members: prev.members.filter((m) => m.email !== member.email),
            }
          : null
      )
    }
  }



  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="w-14 h-14" />
          </Button>
          <Image
            src={company.logo}
            alt="Company Logo"
            width={40}
            height={40}
            className="rounded"
          />
          <h1 className="text-2xl font-bold">{company.name}</h1>
        </div>
        <AddMemberModal companyId={company.id} />
      </div>

      <div className="flex space-x-4 text-muted-foreground text-sm border-b pb-2">
        <div>Нийт: <span className="font-semibold text-black">{total}</span></div>
        <div>Өнөөдөр нийт үзүүлсэн: <span className="font-semibold text-black">{totalViewedToday}</span></div>
        <div>Хугацаа дөхсөн: <span className="font-semibold text-black">{nearExpiry}</span></div>
      </div>

      <Input placeholder="Хэрэглэгчийн нэрээр хайх" className="max-w-md bg-muted" />

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Нэр</TableHead>
              <TableHead>Албан тушаал</TableHead>
              <TableHead>Имэйл</TableHead>
              <TableHead>Утас</TableHead>
              <TableHead>Дуусах огноо</TableHead>
              <TableHead>Үзүүлсэн</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
  {members.map((member, index) => {
    const isExpired = new Date(member.expired) < today
    return (
      
      <TableRow
        key={index}
        className="cursor-pointer hover:bg-gray-100"
        
        onClick={async () => {
          if (!member.id) {
            alert("Member-ийн ID байхгүй байна!")
            return
          }
        
          try {
            // 1. usage-ийг нэмэгдүүлэх
            await fetch(`http://localhost:3001/members/${member.id}/increment-usage`, {
              method: "PATCH",
            })
        
            // 2. дараа нь шилжих
            router.push(`/members/${member.id}`)
          } catch (err) {
            console.error("Failed to increment usage:", err)
            alert("Үзсэн тоог нэмэхэд алдаа гарлаа.")
          }
        }}
        
      >
        <TableCell className="flex items-center space-x-2">
          <Image
            src={member.avatar}
            alt={member.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <span>{member.name}</span>
        </TableCell>
        <TableCell>{member.title}</TableCell>
        <TableCell>{member.email}</TableCell>
        <TableCell>{member.phone}</TableCell>
        <TableCell className={isExpired ? "text-red-500" : ""}>
          {member.expired}
        </TableCell>
        <TableCell>{member.usage}</TableCell>
        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
          {/* Энэ хэсэгт дарахад row-руу үсрэхгүй байх гэж onClick-ийг зогсоолоо */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="py-1 bg-white border border-gray-200 rounded-md shadow-md">
              <DropdownMenuItem onClick={() => handleEdit(member)}>
                <Edit className="mr-2 w-4 h-4" /> Засах
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleResetPassword(member)}>
                <Key className="mr-2 w-4 h-4" /> Нууц үг сэргээх
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShowQRCode(member)}>
                <QrCode className="mr-2 w-4 h-4" /> QR код харах
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(member)}>
                <Trash className="mr-2 w-4 h-4" /> Хасах
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    )
  })}
</TableBody>

        </Table>
      </div>
    </div>
  )
}
