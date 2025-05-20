import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-50">
      {/* Logo */}
      <h1>
        <a href="/dashboard" className="text-4xl font-extrabold text-[#3D4FF4]" style={{ letterSpacing: "-0.10em" }}>
          MEMBRO
        </a>
      </h1>

      {/* Navigation Icons */}
      <nav className="flex items-center space-x-6">
        <button aria-label="Search" className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          <Search className="w-5 h-5 text-gray-600" />
        </button>
        
        <button aria-label="Notifications" className="p-1 rounded-full hover:bg-gray-100 transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        
        <button aria-label="User profile" className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/user.jpg" alt="User profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </button>
      </nav>
    </header>
  );
}