"use client"

import { useState } from "react"
import Navbar from "@/components/navigation/navbar"
import PageHeader from "@/components/page-header/page-header"
import QuoteGeneratorFrame from "@/components/quote-generator-frame/quote-generator-frame"
import { DEFAULT_QUOTE_TYPE, DEFAULT_AUTHOR, DEFAULT_QUOTE } from "@/lib/constants"

// Backend API configuration
const API_BASE_URL = 'http://localhost:4000'

// Map frontend quote types to backend categories
const QUOTE_TYPE_MAPPING = {
  'Motivational': 'Motivation',
  'Fun': 'Funny', 
  'Love': 'Life',
  'KITian': 'Wisdom'
} as const

interface Quote {
  id: number
  text: string
  author: string
  category: string
}

export default function QuotesGenerator() {
  const [quoteType, setQuoteType] = useState(DEFAULT_QUOTE_TYPE)
  const [author, setAuthor] = useState(DEFAULT_AUTHOR)
  const [currentQuote, setCurrentQuote] = useState(DEFAULT_QUOTE)
  const [currentAuthor, setCurrentAuthor] = useState(DEFAULT_AUTHOR)
  const [loading, setLoading] = useState(false)
  const [lastQuoteId, setLastQuoteId] = useState<number | null>(null)

  const handleGenerateQuote = async () => {
    setLoading(true)
    
    try {
      // Map the frontend quote type to backend category
      const category = QUOTE_TYPE_MAPPING[quoteType as keyof typeof QUOTE_TYPE_MAPPING]
      
      // Build API URL with query parameters
      const params = new URLSearchParams()
      if (category) {
        params.append('category', category)
      }
      if (author && author !== "Any") {
        params.append('author', author)
      }
      if (lastQuoteId) {
        params.append('lastQuoteId', lastQuoteId.toString())
      }
      
      const url = `${API_BASE_URL}/api/quote?${params.toString()}`
      
      // Fetch quote from backend
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success && data.quote) {
        const quote: Quote = data.quote
        setCurrentQuote(quote.text)
        setCurrentAuthor(quote.author)
        setLastQuoteId(quote.id)
        console.log('Quote updated:', quote)
      } else {
        throw new Error(data.message || 'Failed to fetch quote')
      }
      
    } catch {
      // Handle fetch errors gracefully - fallback to default quote
      setCurrentQuote("Sorry, couldn't fetch a new quote. Please try again!")
      setCurrentAuthor("Quote Generator")
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#16181D] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        <PageHeader />
        
        <QuoteGeneratorFrame
          quoteType={quoteType}
          selectedAuthor={author}
          currentAuthor={currentAuthor}
          quote={currentQuote}
          onQuoteTypeChange={setQuoteType}
          onAuthorChange={setAuthor}
          onGenerateClick={handleGenerateQuote}
          loading={loading}
        />
      </main>
    </div>
  )
}
