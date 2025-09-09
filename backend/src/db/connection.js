import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { quotes } from './schema.js';
import { count, eq, sql, and } from 'drizzle-orm';

/**
 * Database connection and utilities
 * Handles connection to Neon Postgres database via Drizzle ORM
 */

// Initialize Neon connection
const sql_client = neon(process.env.NEON_DATABASE_URL);

// Initialize Drizzle ORM with Neon connection
export const db = drizzle(sql_client, { schema: { quotes } });

/**
 * Sample quotes to seed the database on first run
 */
const sampleQuotes = [
  // Taing bunsou Quotes
  {
    text: "Today is Today, Tomorrow is Tomorrow",
    author: "Taing bunsou",
    category: "Wisdom" // KITian -> Wisdom
  },
  {
    text: "Why be sad when you can be happy?",
    author: "Taing bunsou", 
    category: "Motivation"
  },
  {
    text: "Love is undefined (404)",
    author: "Taing bunsou",
    category: "Life" // Love -> Life
  },
  {
    text: "Flixibility is Key, so i can go both M&F",
    author: "Taing bunsou",
    category: "Funny" // Fun -> Funny
  },

  // Vanny Sothea Quotes
  {
    text: "Do you know what is Coorad? Check \"coorad.com\".",
    author: "Vanny Sothea",
    category: "Wisdom"
  },
  {
    text: "Sometimes, it's not about motivation. It's about vision.",
    author: "Vanny Sothea",
    category: "Motivation"
  },
  {
    text: "There's no right person, wrong time. If it's wrong, it's wrong. Stop delulu",
    author: "Vanny Sothea",
    category: "Life"
  },
  {
    text: "Nothing is FUN, when SAD step in (System Analysis & Design)",
    author: "Vanny Sothea",
    category: "Funny"
  },

  // Heng Lyhour Quotes
  {
    text: "No more \"Kirirom Institute Of Technology\" next semester",
    author: "Heng Lyhour",
    category: "Wisdom"
  },
  {
    text: "Life is hard, But it getting harder if you don't know where to release",
    author: "Heng Lyhour",
    category: "Motivation"
  },
  {
    text: "Suly Pheng - សារជាតិ Unfaithful [Official MV]",
    author: "Heng Lyhour",
    category: "Life"
  },
  {
    text: "High standard Equal hand-some!",
    author: "Heng Lyhour",
    category: "Funny"
  },

  // Phorn sinet Quotes  
  {
    text: "It is, what it is.",
    author: "Phorn sinet",
    category: "Wisdom"
  },
  {
    text: "No matter what happens in your life, be smiling and grateful.",
    author: "Phorn sinet",
    category: "Motivation"
  },
  {
    text: "Money is more important than your boyfriend.",
    author: "Phorn sinet",
    category: "Life"
  },
  {
    text: "I am not gay, I love women.",
    author: "Phorn sinet",
    category: "Funny"
  },

  // Nho Tomaneath Quotes
  {
    text: "Wifi is slow but my study pace is slower.",
    author: "Nho Tomaneath",
    category: "Wisdom"
  },
  {
    text: "life is hard but it will get harder.",
    author: "Nho Tomaneath", 
    category: "Motivation"
  },
  {
    text: "Loung ke is a must skill.",
    author: "Nho Tomaneath",
    category: "Life"
  },
  {
    text: "somewhere, somehow.",
    author: "Nho Tomaneath",
    category: "Funny"
  },

  // In Empisey Socheata Quotes
  {
    text: "don't wish for it, work for it!",
    author: "In Empisey Socheata",
    category: "Wisdom"
  },
  {
    text: "what? like it's hard?",
    author: "In Empisey Socheata",
    category: "Motivation"
  },
  {
    text: "why have one partner when you can have three. lol",
    author: "In Empisey Socheata",
    category: "Life"
  },
  {
    text: "take my advice, i dont use it anyway.",
    author: "In Empisey Socheata",
    category: "Funny"
  },

  // Noy Chalinh Quotes
  {
    text: "If you suffer, just remember you're not alone.",
    author: "Noy Chalinh",
    category: "Wisdom"
  },
  {
    text: "There is no turning back, keep it up.",
    author: "Noy Chalinh",
    category: "Motivation"
  },
  {
    text: "What is love?",
    author: "Noy Chalinh",
    category: "Life"
  },
  {
    text: "Doing nothing is fun.",
    author: "Noy Chalinh",
    category: "Funny"
  },

  // Chan Ekmongkol Quotes
  {
    text: "One Heart, One KIT",
    author: "Chan Ekmongkol",
    category: "Wisdom"
  },
  {
    text: "Dont stop when you're tired, Stop when you're finish.",
    author: "Chan Ekmongkol",
    category: "Motivation"
  },
  {
    text: "Mix yey ot jes sdab knea jg",
    author: "Chan Ekmongkol",
    category: "Life"
  },
  {
    text: "Mok pi bong men laor",
    author: "Chan Ekmongkol",
    category: "Funny"
  },

  // Chay Lyhour Quotes
  {
    text: "I am still alive.",
    author: "Chay Lyhour", 
    category: "Wisdom"
  },
  {
    text: "Climb mt. fuji, slowly, slowly.",
    author: "Chay Lyhour",
    category: "Motivation"
  },
  {
    text: "a'vei chea sneha",
    author: "Chay Lyhour",
    category: "Life"
  },
  {
    text: "have a restful sleep",
    author: "Chay Lyhour",
    category: "Funny"
  }
];

/**
 * Fallback function to get quotes from memory when database fails
 * @param {string} category - Optional category filter
 * @param {string} author - Optional author filter
 * @returns {Object|null} Random quote object or null
 */
function getFallbackQuote(category = null, author = null) {
  console.log('🔄 Using fallback quotes from memory');
  
  let filteredQuotes = sampleQuotes;
  
  // Apply filters
  if (category) {
    filteredQuotes = filteredQuotes.filter(quote => quote.category === category);
  }
  
  if (author) {
    filteredQuotes = filteredQuotes.filter(quote => quote.author === author);
  }
  
  if (filteredQuotes.length === 0) {
    return null;
  }
  
  // Return random quote with a temporary ID
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  
  return {
    id: Math.floor(Math.random() * 1000), // Temporary ID
    text: quote.text,
    author: quote.author,
    category: quote.category
  };
}

/**
 * Check if quotes table exists and has data
 * @returns {Promise<boolean>} True if table is empty, false otherwise
 */
export async function isQuotesTableEmpty() {
  try {
    const result = await db.select({ count: count() }).from(quotes);
    return result[0].count === 0;
  } catch (error) {
    console.error('Error checking quotes table:', error);
    throw new Error('Database connection failed');
  }
}

/**
 * Seed the database with sample quotes
 * Only runs if the quotes table is empty
 */
export async function seedDatabase() {
  try {
    const isEmpty = await isQuotesTableEmpty();
    
    if (isEmpty) {
      console.log('📚 Seeding database with sample quotes...');
      
      await db.insert(quotes).values(sampleQuotes);
      
      console.log(`✅ Successfully inserted ${sampleQuotes.length} sample quotes`);
    } else {
      console.log('📖 Database already contains quotes, skipping seed');
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

/**
 * Get a random quote, optionally filtered by category and/or author
 * Ensures the same quote is not returned twice in a row
 * @param {string} category - Optional category filter
 * @param {string} author - Optional author filter
 * @param {number} lastQuoteId - ID of the last quote returned (to avoid repeats)
 * @returns {Promise<Object>} Random quote object
 */
export async function getRandomQuote(category = null, author = null, lastQuoteId = null) {
  let retryCount = 0;
  const maxRetries = 3;
  
  while (retryCount < maxRetries) {
    try {
      let query = db.select().from(quotes);
      let conditions = [];
      
      // Apply category filter if provided
      if (category) {
        conditions.push(eq(quotes.category, category));
      }
      
      // Apply author filter if provided
      if (author) {
        conditions.push(eq(quotes.author, author));
      }
      
      // Exclude the last quote ID to avoid repeats
      if (lastQuoteId) {
        conditions.push(sql`${quotes.id} != ${lastQuoteId}`);
      }
      
      // Combine all conditions
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
      
      // Execute query to get all matching quotes
      const allQuotes = await query;
      
      // Return null if no quotes found
      if (allQuotes.length === 0) {
        return null;
      }
      
      // Return random quote from the results
      const randomIndex = Math.floor(Math.random() * allQuotes.length);
      return allQuotes[randomIndex];
      
    } catch (error) {
      console.error(`❌ Database error on attempt ${retryCount + 1}:`, error.message);
      retryCount++;
      
      if (retryCount >= maxRetries) {
        console.error('💥 All retry attempts failed, using fallback quotes');
        return getFallbackQuote(category, author);
      }
      
      // Wait before retry (exponential backoff)
      const waitTime = Math.pow(2, retryCount) * 1000; // 2s, 4s, 8s
      console.log(`⏳ Waiting ${waitTime}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}
