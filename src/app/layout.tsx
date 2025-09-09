import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Fr3_bin Quotes Generator",
  description: "Get random quotes categorized and displayed with authors in a sleek interface",
  keywords: ["quotes", "generator", "motivation", "inspiration"],
  authors: [{ name: "Fr3_bin" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
