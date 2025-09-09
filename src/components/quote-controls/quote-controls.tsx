"use client"

import { Select, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Edit3 } from "lucide-react"
import { QUOTE_TYPES, AUTHORS } from "@/lib/constants"

interface QuoteControlsProps {
  quoteType: string
  author: string
  onQuoteTypeChange: (value: string) => void
  onAuthorChange: (value: string) => void
  onGenerateClick: () => void
  loading?: boolean
}

export default function QuoteControls({
  quoteType,
  author,
  onQuoteTypeChange,
  onAuthorChange,
  onGenerateClick,
  loading = false
}: QuoteControlsProps) {
  return (
    <div className="flex-1 flex flex-col justify-between min-w-[320px] gap-8 pt-2 h-full">
      {/* Quote Type Selection */}
      <div>
        <label className="block text-[16px] font-light mb-4 text-white">
          Quote Type:
        </label>
        <Select
          value={quoteType}
          onChange={onQuoteTypeChange}
          className="w-full bg-[#191a1d] border-none text-white h-14 rounded-2xl px-6 text-[16px] font-light"
        >
          {QUOTE_TYPES.map((type) => (
            <SelectItem key={type} value={type} className="text-white text-[16px] font-light">
              {type}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Author Selection */}
      <div>
        <label className="block text-[16px] font-light mb-4 text-white">
          Author:
        </label>
        <Select
          value={author}
          onChange={onAuthorChange}
          className="w-full bg-[#191a1d] border-none text-white h-14 rounded-2xl px-6 text-[16px] font-light"
        >
          {AUTHORS.map((authorName) => (
            <SelectItem key={authorName} value={authorName} className="text-white text-[16px] font-light">
              {authorName}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Generate Button */}
      <Button 
        onClick={onGenerateClick}
        disabled={loading}
        className="w-full bg-white text-black hover:bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed h-16 text-[16px] font-light flex items-center justify-center space-x-2 rounded-2xl mt-auto"
      >
        <Edit3 className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
        <span>{loading ? 'Generating...' : 'Generate Quotes'}</span>
      </Button>
    </div>
  )
}
