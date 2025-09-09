import { pgTable, serial, text } from 'drizzle-orm/pg-core';

/**
 * Quotes table schema
 * Stores all quote information including text, author, and category
 */
export const quotes = pgTable('quotes', {
  // Primary key - auto-incrementing serial ID
  id: serial('id').primaryKey(),
  
  // Quote text content
  text: text('text').notNull(),
  
  // Author of the quote
  author: text('author').notNull(),
  
  // Category classification (Motivation, Life, Funny, Wisdom)
  category: text('category').notNull(),
});

// Export the schema for use in migrations and queries
export default { quotes };
