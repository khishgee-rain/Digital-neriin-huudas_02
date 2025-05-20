"use client"

//profile

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Globe, MapPin, Contact } from "lucide-react"
import Loader from "@/components/ui/loading"
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookMessenger,
} from "react-icons/fa6"
import { Member } from "@/types/member"

export default function MemberProfile() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id
  const [member, setMember] = useState<Member | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await fetch(`http://172.20.10.11:3001/cards/${id}`)
        if (!res.ok) throw new Error("Failed to fetch member")
        const data = await res.json()
        setMember(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchMember()
  }, [id])

  // VCard download function
  function downloadVCard(member: Member) {
    const wrap75 = (str: string) => str.replace(/(.{75})/g, "$1\r\n ")
    const lines: string[] = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${member.name}`,
    ]


    
    if (member.avatar) {
      const [, mime, b64Data] =
        member.avatar.match(/^data:(image\/[^;]+);base64,(.*)$/) || []
      if (mime && b64Data) {
        const type = mime.toUpperCase().replace("IMAGE/", "")
        lines.push(`PHOTO;ENCODING=b;TYPE=${type}:${wrap75(b64Data)}`)
      }
    }

    if (member.title) lines.push(`TITLE:${member.title}`)
    if (member.phone) lines.push(`TEL;TYPE=CELL:${member.phone}`)
    if (member.email) lines.push(`EMAIL;TYPE=INTERNET:${member.email}`)
    if (member.website) lines.push(`URL:${member.website}`)
    if (member.location) lines.push(`ADR:${member.location}`)

    lines.push("END:VCARD")

    const blob = new Blob([lines.join("\r\n")], { type: "text/vcard" })
    const url = URL.createObjectURL(blob)
    const link = Object.assign(document.createElement("a"), {
      href: url,
      download: `${member.name}.vcf`,
    })
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (loading) return <Loader />
  if (!member) return <div className="text-center p-4">Гишүүн олдсонгүй.</div>

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Cover + Avatar */}
      <div className="relative h-48 w-full rounded-lg bg-gray-100 pb-12">
        <Image
          src={member.coverPhoto}
          alt={member.name}
          fill
          className="object-cover rounded-lg"
          priority
        />
        <div className="absolute -bottom-12 left-4 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
          <Image
            src={member.avatar}
            alt={member.name}
            width={96}
            height={96}
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col mt-16 ml-4">
        <h1 className="text-xl font-bold text-black">{member.name}</h1>
        <p className="text-sm text-gray-600">{member.title}</p>
        <p className="text-sm text-gray-500">{member.domain}</p>
        <p className="text-sm text-gray-700 mt-2">
          {member.bio || "Мэдээлэл алга байна."}
        </p>
      </div>

      {/* Social Icons + vCard */}
      <div className="flex justify-center gap-3 mt-4" >
        {member.facebook && (
          <SocialIcon url={member.facebook} label="Facebook">
            <FaFacebookF size={20} />
          </SocialIcon>
        )}
        {member.messenger && (
          <SocialIcon url={member.messenger} label="Messenger">
            <FaFacebookMessenger size={20} />
          </SocialIcon>
        )}
        {member.instagram && (
          <SocialIcon url={member.instagram} label="Instagram">
            <FaInstagram size={20} />
          </SocialIcon>
        )}
        {member.x && (
          <SocialIcon url={member.x} label="X">
            <FaXTwitter size={20} />
          </SocialIcon>
        )}
        {member.linkedin && (
          <SocialIcon url={member.linkedin} label="LinkedIn">
            <FaLinkedinIn size={20} />
          </SocialIcon>
        )}
        {/* vCard inline icon */}
        <button
          onClick={() => downloadVCard(member)}
          aria-label="Download vCard"
          className="bg-gray-100 p-3 rounded-full hover:scale-110 transition text-black"
        >
          <Contact size={20} />
        </button>
      </div>

      {/* Contact Info */}
      <Card className="shadow-sm">
        <CardContent className="p-4 divide-y divide-gray-200">
          <ContactRow icon={<Phone />} text={member.phone} />
          <ContactRow icon={<Mail />} text={member.email} />
          <ContactRow icon={<Globe />} text={member.website} />
          <ContactRow icon={<MapPin />} text={member.location} />
        </CardContent>
      </Card>

      {/* Solution Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-center">ЦАХИМААР ШИЙДЬЕ</h2>
        <div className="relative h-64 w-full rounded-lg overflow-hidden bg-gray-100">
          <Image
            src="https://amaris.com/wp-content/uploads/2023/04/Digital-Solutions2-2048x852.png"
            alt="Digital Solution"
            fill
            className="object-cover"
          />
        </div>
        <div className="aspect-w-16 aspect-h-9 w-full">
          <iframe
            className="w-full h-64 rounded-lg"
            src="https://www.youtube.com/embed/4NApGYepVJA"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}

function SocialIcon({
  url,
  children,
  label,
}: {
  url: string
  children: React.ReactNode
  label: string
}) {
  return (
    <a
      href={url}
      target="_blank"
      aria-label={label}
      className="bg-gray-100 p-3 rounded-full hover:scale-110 transition text-black shadow-sm"
    >
      {children}
    </a>
  )
}

function ContactRow({
  icon,
  text,
}: {
  icon: React.ReactNode
  text?: string
}) {
  if (!text) return null
  return (
    <div className="flex items-center gap-3 py-2 text-gray-800">
      <div className="bg-gray-100 p-2 rounded-full flex-shrink-0">{icon}</div>
      <span className="text-sm break-words">{text}</span>
    </div>
  )
}