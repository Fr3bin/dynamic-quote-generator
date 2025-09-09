"use client"

import { ChevronDown } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#21252C]">
      <div className="flex items-center space-x-8">
        <h1 className="text-4xl font-bold font-jaini">Fr3_bin</h1>
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-1 text-gray-300 hover:text-white">
            <span>Category</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center space-x-1 text-gray-300 hover:text-white">
            <span>Author</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center space-x-1 text-gray-300 hover:text-white">
            <span>About</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
        <span className="text-black font-medium">U</span>
      </div>
    </nav>
  )
}
