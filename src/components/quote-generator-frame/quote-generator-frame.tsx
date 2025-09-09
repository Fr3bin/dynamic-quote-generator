import QuoteCard from "@/components/quote-card/quote-card"
import QuoteControls from "@/components/quote-controls/quote-controls"

interface QuoteGeneratorFrameProps {
  quoteType: string
  author: string
  quote: string
  onQuoteTypeChange: (value: string) => void
  onAuthorChange: (value: string) => void
  onGenerateClick: () => void
}

export default function QuoteGeneratorFrame({
  quoteType,
  author,
  quote,
  onQuoteTypeChange,
  onAuthorChange,
  onGenerateClick
}: QuoteGeneratorFrameProps) {
  return (
    <div className="w-[1000px] h-[400px] mx-auto bg-[#21252C] rounded-[48px] px-12 py-10 flex flex-row gap-12 items-center justify-between">
      <QuoteCard quote={quote} author={author} />
      <QuoteControls
        quoteType={quoteType}
        author={author}
        onQuoteTypeChange={onQuoteTypeChange}
        onAuthorChange={onAuthorChange}
        onGenerateClick={onGenerateClick}
      />
    </div>
  )
}
