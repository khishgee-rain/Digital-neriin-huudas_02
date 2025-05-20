import * as React from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button" // Assuming you have a custom Button component

function MyDropdownMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button size="sm" variant="ghost" className="p-1">
          Open Menu
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="py-1 bg-white border border-gray-200 rounded-md shadow-md">
        <DropdownMenu.Item onClick={() => alert("Edit")}>Edit</DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => alert("Reset Password")}>Reset Password</DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => alert("View QR Code")}>View QR Code</DropdownMenu.Item>
        <DropdownMenu.Item className="text-red-500" onClick={() => alert("Delete")}>Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
export default MyDropdownMenu
