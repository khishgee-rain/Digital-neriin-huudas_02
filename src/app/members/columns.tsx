// columns.tsx
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Edit, Key, QrCode, Trash } from "lucide-react"
import { AvatarCell } from "./AvatarCell"
import { Member } from "@/types/member"

type ActionCallbacks = {
  onEdit: (member: Member) => void
  onDelete: (member: Member) => void
  onResetPassword: (member: Member) => void
  onShowQRCode: (member: Member) => void
}

export const getColumns = ({
  onEdit,
  onDelete,
  onResetPassword,
  onShowQRCode,
}: ActionCallbacks): ColumnDef<Member, unknown>[] => [
  {
    accessorKey: "name",
    header: "Нэр",
    cell: ({ row }) => <AvatarCell member={row.original} />,
  },
  {
    accessorKey: "title",
    header: "Албан тушаал",
  },
  {
    accessorKey: "email",
    header: "Имэйл",
  },
  {
    accessorKey: "phone",
    header: "Утас",
  },
  {
    accessorKey: "expiresAt",
    header: "Дуусах огноо",
    cell: ({ row }) => {
      const date = new Date(row.original.expiresAt)
      return format(date, "yyyy-MM-dd")
    },
  },
  {
    accessorKey: "viewed",
    header: "Үзүүлсэн",
  },
  {
    header: "",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              size="sm"
              variant="ghost"
              className="p-1"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xl">⋮</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="py-1 bg-white border border-gray-200 rounded-md shadow-md">
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <Edit className="mr-2 w-4 h-4" /> Засах
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onResetPassword(row.original)}>
              <Key className="mr-2 w-4 h-4" /> Нууц үг сэргээх
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onShowQRCode(row.original)}>
              <QrCode className="mr-2 w-4 h-4" /> QR код харах
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500" onClick={() => onDelete(row.original)}>
              <Trash className="mr-2 w-4 h-4" /> Хасах
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
]
