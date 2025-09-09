"use client"

import { useState } from "react"
import Navbar from "@/components/navigation/navbar"
import PageHeader from "@/components/page-header/page-header"
import QuoteGeneratorFrame from "@/components/quote-generator-frame/quote-generator-frame"
import { DEFAULT_QUOTE_TYPE, DEFAULT_AUTHOR, DEFAULT_QUOTE } from "@/lib/constants"

export default function QuotesGenerator() {
  const [quoteType, setQuoteType] = useState(DEFAULT_QUOTE_TYPE)
  const [author, setAuthor] = useState(DEFAULT_AUTHOR)
  const [currentQuote, setCurrentQuote] = useState(DEFAULT_QUOTE)

  const handleGenerateQuote = () => {
    // TODO: Implement quote generation logic based on type and author
    console.log(`Generating ${quoteType} quote by ${author}`)
  }

  return (
    <div className="min-h-screen bg-[#16181D] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        <PageHeader />
        
        <QuoteGeneratorFrame
          quoteType={quoteType}
          author={author}
          quote={currentQuote}
          onQuoteTypeChange={setQuoteType}
          onAuthorChange={setAuthor}
          onGenerateClick={handleGenerateQuote}
        />
      </main>
    </div>
  )
}
