"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Member } from "@/types/member"

type Props = { member: Member }

export function AvatarCell({ member }: Props) {
  const router = useRouter()

  const goProfile = () => router.push(`/members/${member.id}`)

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation() // don’t bubble to the table row
        goProfile()
      }}
    >
      <Avatar className="w-8 h-8 transition-transform duration-150 group-hover:scale-105">
        <AvatarImage src={member.avatar ?? ""} alt={member.name} />
        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <span className="font-medium truncate">{member.name}</span>
    </div>
  )
}
