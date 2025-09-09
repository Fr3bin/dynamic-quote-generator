export const QUOTE_TYPES = ["Motivational", "Fun", "Love", "KITian"] as const

export const AUTHORS = ["Taing Bunsou", "Albert Einstein", "Steve Jobs", "Maya Angelou"] as const

export const DEFAULT_QUOTE = "Today is Today, Tomorrow is Tomorrow."

export const DEFAULT_AUTHOR = "Taing Bunsou"

export const DEFAULT_QUOTE_TYPE = "Motivational"

export type QuoteType = typeof QUOTE_TYPES[number]
export type Author = typeof AUTHORS[number]
