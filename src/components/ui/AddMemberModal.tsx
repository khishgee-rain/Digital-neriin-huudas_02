/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AddMemberModal({ companyId }: { companyId?: number }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    domain: '',
    avatar: '',
    coverPhoto: '',
    location: '',
    website: '',
    bio: '',
    facebook: '',
    messenger: '',
    instagram: '',
    x: '',
    linkedin: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileToBase64 = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setForm({ ...form, [field]: reader.result as string })
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('authToken')

    try {
      const payload: any = {
        ...form,
        shared: 0,
      }

      if (companyId) {
        payload.companyId = companyId
      }

      const res = await fetch('http://localhost:3001/cards/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const error = await res.json()
        alert(error.error || 'Card үүсгэхэд алдаа гарлаа')
        throw new Error(error.error || 'Card үүсгэхэд алдаа гарлаа')
      }

      setOpen(false)
      setForm({
        name: '',
        title: '',
        email: '',
        phone: '',
        domain: '',
        avatar: '',
        coverPhoto: '',
        location: '',
        website: '',
        bio: '',
        facebook: '',
        messenger: '',
        instagram: '',
        x: '',
        linkedin: ''
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Member</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="z-50 max-w-2xl w-full max-h-[90vh] overflow-y-scroll fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:rounded-lg bg-white shadow-xl"
        >
          <DialogHeader>
          <DialogTitle>
  <VisuallyHidden>Шинэ гишүүн нэмэх</VisuallyHidden>
</DialogTitle>
            <DialogDescription>
              Доорх мэдээллийг бөглөж шинэ гишүүн нэмнэ үү.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div>
              <label className="block mb-1 font-medium">Avatar зураг</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileToBase64(e, "avatar")}
              />
              {form.avatar && (
                <img
                  src={form.avatar}
                  alt="avatar preview"
                  className="mt-2 w-20 h-20 object-cover rounded-full border"
                />
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Cover зураг</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileToBase64(e, "coverPhoto")}
              />
              {form.coverPhoto && (
                <img
                  src={form.coverPhoto}
                  alt="cover preview"
                  className="mt-2 w-full max-h-40 object-cover rounded border"
                />
              )}
            </div>

            {[
              { name: "name", placeholder: "Нэр" },
              { name: "title", placeholder: "Албан тушаал" },
              { name: "email", placeholder: "Имэйл" },
              { name: "phone", placeholder: "Утас" },
              { name: "domain", placeholder: "Домен (давтагдахгүй)" },
              { name: "location", placeholder: "Байршил" },
              { name: "website", placeholder: "Вебсайт" },
              { name: "bio", placeholder: "Товч танилцуулга" },
              { name: "facebook", placeholder: "Facebook линк" },
              { name: "messenger", placeholder: "Messenger линк" },
              { name: "instagram", placeholder: "Instagram линк" },
              { name: "x", placeholder: "X (Twitter) линк" },
              { name: "linkedin", placeholder: "LinkedIn линк" },
            ].map((input) => (
              <Input
                key={input.name}
                name={input.name}
                placeholder={input.placeholder}
                onChange={handleChange}
                value={(form as any)[input.name]}
              />
            ))}

            <Button
              onClick={handleSubmit}
              variant="default"
              size="default"
              className="w-full"
            >
              Хадгалах
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
