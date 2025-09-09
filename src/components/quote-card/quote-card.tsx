import { Icon } from "@iconify/react"

interface QuoteCardProps {
  quote: string
  author: string
}

export default function QuoteCard({ quote, author }: QuoteCardProps) {
  return (
    <div className="flex flex-col justify-start" style={{ width: 480 }}>
      <h2 className="text-[16px] font-light mb-6 text-white">
        Your Quotes here:
      </h2>
      <div className="bg-[#2E323A] rounded-[36px] px-10 py-1 w-[450px] h-[200px] flex flex-col justify-between">
        <div className="flex flex-row items-start">
          <Icon 
            icon="material-symbols:format-quote"
            className="text-[40px] text-white mr-4 mt-2 flex-shrink-0 scale-x-[-1]"
          />
          <blockquote className="text-[20px] text-white font-light leading-snug mb-1 text-left mt-10">
            {quote}
          </blockquote>
        </div>
        <cite className="block text-white text-right text-[16px] font-light mb-5">
          - {author}
        </cite>
      </div>
    </div>
  )
}
