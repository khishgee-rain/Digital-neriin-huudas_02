"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CameraIcon, Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin } from "lucide-react"
import { Member } from "@/types/member"

interface ProfileFormProps {
  member?: Member
}

export function ProfileForm({ member }: ProfileFormProps) {
  return (
    <div className="bg-[#f5f6ff] min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl p-6 space-y-6 shadow">
        {/* Header */}
        <h2 className="text-xl font-semibold text-center">
          {member ? `${member.name} - Хувийн мэдээлэл` : "Шинэ гишүүн нэмэх"}
        </h2>

        {/* Cover Photo */}
        <div className="w-full h-32 bg-gray-100 rounded-md relative flex items-center justify-center">
          <span className="text-gray-500 text-sm font-medium">Add Cover Photo</span>
          <button className="absolute bottom-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full">
            <CameraIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Profile Picture */}
        <div className="relative -mt-12 mx-auto w-24 h-24">
          <div className="w-full h-full rounded-full bg-gray-200 border-4 border-white flex items-center justify-center">
            <CameraIcon className="w-6 h-6 text-gray-500" />
          </div>
          <button className="absolute bottom-0 right-0 bg-white border rounded-full p-1.5 hover:bg-gray-50">
            <CameraIcon className="w-3 h-3 text-gray-600" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Domain Number */}
          <div>
            <Label>Domain number</Label>
            <Input 
              placeholder="Unique number for member" 
              defaultValue={member?.domain || ""}
            />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input 
                placeholder="First Name" 
                defaultValue={member?.name.split(' ')[0] || ""}
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input 
                placeholder="Last Name" 
                defaultValue={member?.name.split(' ')[1] || ""}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <Label>Сонгох ангилал</Label>
            <Select defaultValue={member ? "member" : undefined}>
              <SelectTrigger>
                <SelectValue placeholder="Сонгох ангилал" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">Гишүүн</SelectItem>
                <SelectItem value="admin">Админ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div>
            <Label>Title</Label>
            <Input 
              placeholder="Title" 
              defaultValue={member?.title || ""}
            />
          </div>

          {/* Bio */}
          <div>
            <Label>Short bio</Label>
            <Textarea 
              placeholder="Tell us about yourself" 
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">0 / 800</p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4 pt-2 border-t">
            <h3 className="font-medium">Холбоо барих</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>
                  <Phone className="inline w-4 h-4 mr-1" />
                  Утас
                </Label>
                <Input 
                  placeholder="Утас" 
                  defaultValue={member?.phone || ""}
                />
              </div>
              <div>
                <Label>
                  <Mail className="inline w-4 h-4 mr-1" />
                  Имэйл
                </Label>
                <Input 
                  placeholder="Имэйл" 
                  defaultValue={member?.email || ""}
                />
              </div>
            </div>

            <div>
              <Label>
                <MapPin className="inline w-4 h-4 mr-1" />
                Байршил
              </Label>
              <Input placeholder="Хот, байршил" />
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4 pt-2 border-t">
            <h3 className="font-medium">Сошиал медиа</h3>
            
            <div className="space-y-4">
              <div>
                <Label>
                  <Facebook className="inline w-4 h-4 mr-1" />
                  Facebook
                </Label>
                <Input placeholder="Facebook url" />
              </div>
              <div>
                <Label>
                  <Instagram className="inline w-4 h-4 mr-1" />
                  Instagram
                </Label>
                <Input placeholder="Instagram url" />
              </div>
              <div>
                <Label>
                  <Linkedin className="inline w-4 h-4 mr-1" />
                  LinkedIn
                </Label>
                <Input placeholder="LinkedIn url" />
              </div>
              <div>
                <Label>
                  <Twitter className="inline w-4 h-4 mr-1" />
                  X (Twitter)
                </Label>
                <Input placeholder="Twitter url" />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Хадгалах
          </Button>
        </div>
      </div>
    </div>
  )
}