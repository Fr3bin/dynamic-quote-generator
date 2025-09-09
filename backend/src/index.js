import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { seedDatabase, getRandomQuote } from './db/connection.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

/**
 * Express + Drizzle + Neon Postgres Backend
 * Fr3-bin Quote Generator API Server
 */

// Middleware configuration
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001',
    'http://localhost:3002', 
    'http://localhost:3003',
    'http://localhost:3004',
    'http://localhost:3005',
    'http://localhost:3006',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
    'http://127.0.0.1:3003',
    'http://127.0.0.1:3004',
    'http://127.0.0.1:3005',
    'http://127.0.0.1:3006'
  ], // Allow Next.js frontend on different ports
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

/**
 * Health check endpoint
 * GET /health - Returns server status
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Fr3-bin Quote Generator Backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

/**
 * Get random quote endpoint with category and author filtering
 * GET /api/quote?category={category}&author={author}&lastQuoteId={id}
 * 
 * Query Parameters:
 * - category (optional): Filter quotes by category
 * - author (optional): Filter quotes by author
 * - lastQuoteId (optional): Exclude this quote ID to prevent repeats
 */
app.get('/api/quote', async (req, res) => {
  try {
    const { category, author, lastQuoteId } = req.query;
    
    // Get random quote from database
    const quote = await getRandomQuote(
      category || null,
      author || null,
      lastQuoteId ? parseInt(lastQuoteId) : null
    );
    
    // Handle no quotes found
    if (!quote) {
      let message = 'No quotes available in database';
      if (category && author) {
        message = `No quotes available for category "${category}" by author "${author}"`;
      } else if (category) {
        message = `No quotes available for category: ${category}`;
      } else if (author) {
        message = `No quotes available by author: ${author}`;
      }
      
      return res.status(404).json({
        error: 'No quotes found',
        message: message,
        filters: {
          category: category || null,
          author: author || null
        }
      });
    }
    
    // Return successful response
    res.json({
      success: true,
      quote: {
        id: quote.id,
        text: quote.text,
        author: quote.author,
        category: quote.category
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestedCategory: category || null
      }
    });
    
  } catch (error) {
    console.error('❌ Error in /api/quote endpoint:', error);
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch quote from database',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * Add a new quote to the database
 * POST /api/quote - Adds a new quote
 * Body: { text: string, author: string, category: string }
 */
app.post('/api/quote', async (req, res) => {
  try {
    const { text, author, category } = req.body;
    
    // Validate required fields
    if (!text || !author || !category) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide text, author, and category',
        required: ['text', 'author', 'category']
      });
    }
    
    // Validate category
    const validCategories = ['Motivation', 'Life', 'Wisdom', 'Funny'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        error: 'Invalid category',
        message: `Category must be one of: ${validCategories.join(', ')}`,
        provided: category
      });
    }
    
    // Import quotes from connection
    const { quotes } = await import('./db/schema.js');
    
    // Insert new quote
    const result = await db.insert(quotes).values({
      text: text.trim(),
      author: author.trim(),
      category: category.trim()
    }).returning();
    
    console.log(`✅ New quote added - ID: ${result[0].id}, Author: ${result[0].author}`);
    
    res.json({
      success: true,
      message: 'Quote added successfully',
      quote: result[0],
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error adding quote:', error);
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to add quote to database',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * Get available quote categories
 * GET /api/categories - Returns list of all available categories
 */
app.get('/api/categories', async (req, res) => {
  try {
    // This could be expanded to dynamically fetch from database
    // For now, return the known categories based on our schema
    const categories = [
      'Motivation',
      'Life', 
      'Wisdom',
      'Funny'
    ];
    
    res.json({
      success: true,
      categories,
      count: categories.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error in /api/categories endpoint:', error);
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch categories'
    });
  }
});

/**
 * 404 handler for undefined routes
 */
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route Not Found',
    message: `The requested route ${req.method} ${req.originalUrl} does not exist`,
    availableEndpoints: [
      'GET /health',
      'GET /api/quote',
      'GET /api/categories'
    ]
  });
});

/**
 * Global error handler
 */
app.use((error, req, res, next) => {
  console.error('💥 Unhandled error:', error);
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server',
    timestamp: new Date().toISOString()
  });
});

/**
 * Initialize database and start server
 */
async function startServer() {
  try {
    console.log('🚀 Starting Fr3-bin Quote Generator Backend...');
    
    // Seed database with initial data
    await seedDatabase();
    
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`\n🎉 Server is running successfully!`);
      console.log(`📍 Local URL: http://localhost:${PORT}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
      console.log(`📚 API Endpoint: http://localhost:${PORT}/api/quote`);
      console.log(`📂 Categories: http://localhost:${PORT}/api/categories`);
      console.log(`\n💡 Ready to serve quotes to your Next.js frontend!\n`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

/**
 * Handle graceful shutdown
 */
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

// Start the server
startServer();
