export const QUOTE_TYPES = ["Motivational", "Fun", "Love", "KITian"] as const

export const AUTHORS = [
  "Taing bunsou",
  "Vanny Sothea", 
  "Heng Lyhour",
  "Phorn sinet",
  "Nho Tomaneath",
  "In Empisey Socheata",
  "Noy Chalinh",
  "Chan Ekmongkol", 
  "Chay Lyhour"
] as const

export const DEFAULT_QUOTE = "Today is Today, Tomorrow is Tomorrow"

export const DEFAULT_AUTHOR = "Taing bunsou"

export const DEFAULT_QUOTE_TYPE = "Motivational"

export type QuoteType = typeof QUOTE_TYPES[number]
export type Author = typeof AUTHORS[number]
