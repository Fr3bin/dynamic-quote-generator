import QuoteCard from "@/components/quote-card/quote-card"
import QuoteControls from "@/components/quote-controls/quote-controls"

interface QuoteGeneratorFrameProps {
  quoteType: string
  selectedAuthor: string
  currentAuthor: string
  quote: string
  onQuoteTypeChange: (value: string) => void
  onAuthorChange: (value: string) => void
  onGenerateClick: () => void
  loading?: boolean
}

export default function QuoteGeneratorFrame({
  quoteType,
  selectedAuthor,
  currentAuthor,
  quote,
  onQuoteTypeChange,
  onAuthorChange,
  onGenerateClick,
  loading = false
}: QuoteGeneratorFrameProps) {
  return (
    <div className="w-[1000px] h-[400px] mx-auto bg-[#21252C] rounded-[48px] px-12 py-10 flex flex-row gap-12 items-center justify-between">
      <QuoteCard quote={quote} author={currentAuthor} />
      <QuoteControls
        quoteType={quoteType}
        author={selectedAuthor}
        onQuoteTypeChange={onQuoteTypeChange}
        onAuthorChange={onAuthorChange}
        onGenerateClick={onGenerateClick}
        loading={loading}
      />
    </div>
  )
}
