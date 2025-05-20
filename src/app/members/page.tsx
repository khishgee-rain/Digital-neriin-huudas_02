"use client"

import { useEffect, useState } from "react"
import { getColumns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Member } from "@/types/member"
import AddMemberModal from "@/components/ui/AddMemberModal"
import { useRouter } from "next/navigation"
import Loader from "@/components/ui/loading"

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("http://localhost:3001/cards")
        const data = await res.json()
        const personalMembers = data.filter((member: Member) => member.companyId === null)
        setMembers(personalMembers)
      } catch (err) {
        console.error("Failed to fetch members:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  // ✅ Callback-ууд
  const handleEdit = (member: Member) => router.push(`/profile/${member.id}/edit`)
  const handleDelete = (member: Member) => {
    if (confirm(`${member.name} гишүүнийг устгах уу?`)) {
      setMembers(prev => prev.filter(m => m.id !== member.id))
      alert("Устгагдлаа")
    }
  }
  const handleResetPassword = (member: Member) => {
    alert(`Нууц үг сэргээх илгээв: ${member.email}`)
  }
  const handleShowQRCode = (member: Member) => {
    alert(`QR код харуулах: ${member.name}`)
  }

  const columns = getColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onResetPassword: handleResetPassword,
    onShowQRCode: handleShowQRCode,
  })

  const totalMembers = members.length
  const totalViewedToday = members.reduce((sum, m) => sum + m.viewed, 0)
  const nearExpiry = members.filter(m => {
    const daysLeft = (new Date(m.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    return daysLeft <= 3
  }).length

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Гишүүд</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2" style={{ backgroundColor: "#3D4FF4", color: "white" }}>
              <Plus className="w-5 h-5" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <AddMemberModal />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-4 text-muted-foreground text-sm border-b pb-2">
        <div>Нийт: <span className="font-semibold text-black">{totalMembers}</span></div>
        <div>Өнөөдөр нийт үзүүлсэн: <span className="font-semibold text-black">{totalViewedToday}</span></div>
        <div>Хугацаа дөхсөн: <span className="font-semibold text-black">{nearExpiry}</span></div>
      </div>

      {loading ? (
        <Loader />
      ) : (
          <DataTable<Member, unknown> columns={columns} data={members} />
      )}
    </div>
  )
}
