# Fr3-bin Quote Generator Backend

Professional Node.js + Express REST API serving authentic quotes from KIT students with advanced filtering and error handling.

## 🚀 Overview

This backend provides a robust API for the Fr3-bin Quote Generator, featuring 36 real quotes from 9 KIT students with comprehensive filtering capabilities, database retry mechanisms, and professional error handling.

## � Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework  
- **Drizzle ORM** - Type-safe database operations
- **Neon PostgreSQL** - Serverless PostgreSQL database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## 📡 API Endpoints

### `GET /api/quote`
Retrieve random quotes with optional filtering.

**Query Parameters:**
- `category` (optional) - Filter by quote category
- `author` (optional) - Filter by specific author  
- `lastQuoteId` (optional) - Exclude specific quote ID

**Example Response:**
```json
{
  "success": true,
  "quote": {
    "id": 1,
    "text": "Today is Today, Tomorrow is Tomorrow",
    "author": "Taing bunsou", 
    "category": "Motivation"
  },
  "meta": {
    "timestamp": "2025-09-09T08:00:00.000Z",
    "requestedCategory": "Motivation"
  }
}
```

### `GET /health`
Health check endpoint for monitoring service status.

### `GET /api/categories`
Returns available quote categories.

### `POST /api/quote`
Add new quotes to the database (admin functionality).

## 🗃 Database Schema

```sql
CREATE TABLE quotes (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  author TEXT NOT NULL, 
  category TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🏗 Project Structure

```
backend/
├── src/
│   ├── db/
│   │   ├── schema.js        # Database schema definition
│   │   └── connection.js    # DB connection & utilities
│   └── index.js            # Express server entry point
├── drizzle/                # Database migrations
├── package.json            # Dependencies & scripts
└── .env.example           # Environment template
```

## ⚙️ Environment Setup

1. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Configure variables:**
   ```env
   NEON_DATABASE_URL=postgresql://username:password@host/database
   PORT=4000
   NODE_ENV=production
   ```

## 🚦 Getting Started

```bash
# Install dependencies
npm install

# Setup database
npm run db:migrate  

# Start server
npm start

# Development with auto-reload
npm run dev
```

## 📊 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Development server with nodemon |
| `npm run db:migrate` | Run database migrations |
| `npm run db:studio` | Open Drizzle Studio |

## 🔒 Error Handling

Comprehensive error responses with proper HTTP status codes:

```json
{
  "error": "No quotes found",
  "message": "No quotes available for category \"Fun\" by author \"John Doe\"",
  "filters": {
    "category": "Fun",
    "author": "John Doe"  
  }
}
```

## 🌐 CORS Configuration

Configured for multiple development ports:
- `localhost:3000-3006`
- `127.0.0.1:3000-3006`

## 📈 Performance Features

- **Retry Mechanism** - Database connection resilience
- **Query Optimization** - Efficient database queries
- **Connection Pooling** - Optimized database connections
- **Graceful Error Recovery** - Fallback mechanisms

## 👥 Data Source

**36 Authentic Quotes from 9 KIT Students:**
- Taing bunsou, Vanny Sothea, Heng Lyhour
- Phorn sinet, Nho Tomaneath, In Empisey Socheata  
- Noy Chalinh, Chan Ekmongkol, Chay Lyhour

**Categories:** Motivation, Funny, Life, Wisdom

## 🔧 Development

The API is designed for easy integration with the Next.js frontend and provides a solid foundation for quote management functionality.

## 📄 License

MIT License - Part of the Fr3-bin Quote Generator project.

## 📋 Prerequisites

- Node.js 18+ installed
- Neon Postgres database account
- Environment variables configured

## 🛠 Installation

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
cp .env.example .env
```
Edit `.env` file with your Neon database URL:
```
NEON_DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
NODE_ENV=development
PORT=4000
```

4. **Run database migration:**
```bash
npm run migrate
```

5. **Start the development server:**
```bash
npm run dev
```

## 🗄 Database Schema

### Quotes Table
| Column   | Type         | Constraints |
|----------|--------------|-------------|
| id       | Serial       | Primary Key |
| text     | VARCHAR(500) | NOT NULL    |
| author   | VARCHAR(100) | NOT NULL    |
| category | VARCHAR(50)  | NOT NULL    |

### Sample Categories
- Motivation
- Life  
- Wisdom
- Funny

## 🔌 API Endpoints

### Health Check
```http
GET /health
```
**Response:**
```json
{
  "status": "OK",
  "message": "Fr3-bin Quote Generator Backend is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

### Get Random Quote
```http
GET /api/quote?category={category}&lastQuoteId={id}
```

**Query Parameters:**
- `category` (optional): Filter by quote category
- `lastQuoteId` (optional): Exclude this quote ID to prevent repeats

**Response:**
```json
{
  "success": true,
  "quote": {
    "id": 1,
    "text": "The only way to do great work is to love what you do.",
    "author": "Steve Jobs",
    "category": "Motivation"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00.000Z",
    "requestedCategory": "Motivation"
  }
}
```

**Error Response:**
```json
{
  "error": "No quotes found",
  "message": "No quotes available for category: InvalidCategory",
  "category": "InvalidCategory"
}
```

### Get Available Categories
```http
GET /api/categories
```

**Response:**
```json
{
  "success": true,
  "categories": ["Motivation", "Life", "Wisdom", "Funny"],
  "count": 4,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🏗 Project Structure

```
backend/
├── src/
│   ├── db/
│   │   ├── schema.js          # Drizzle database schema
│   │   └── connection.js      # Database utilities
│   ├── index.js              # Express server entry point
│   └── migrate.js            # Database migration script
├── drizzle/                  # Generated migration files
├── .env.example              # Environment template
├── drizzle.config.js         # Drizzle ORM configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This documentation
```

## 📝 Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run database migrations
npm run migrate

# Generate new migrations (after schema changes)
npm run generate

# Push schema directly to database (development)
npm run push
```

## 🔧 Configuration

### CORS Settings
The server allows requests from:
- `http://localhost:3000` (Next.js development)
- `http://127.0.0.1:3000` (Alternative local)

### Database Connection
- Uses Neon serverless Postgres
- Connection pooling handled automatically
- SSL mode required for security

### Error Handling
- Global error middleware
- Detailed logging with timestamps
- Environment-based error details
- Graceful shutdown on SIGINT/SIGTERM

## 🔗 Frontend Integration

### Next.js API Calls

```javascript
// Fetch random quote
const fetchQuote = async (category = '', lastQuoteId = null) => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (lastQuoteId) params.append('lastQuoteId', lastQuoteId);
  
  const response = await fetch(`http://localhost:4000/api/quote?${params}`);
  const data = await response.json();
  return data;
};

// Fetch categories
const fetchCategories = async () => {
  const response = await fetch('http://localhost:4000/api/categories');
  const data = await response.json();
  return data.categories;
};
```

## 🛡 Security Features

- CORS configuration for specific origins
- Request size limits (10MB)
- SQL injection protection via Drizzle ORM
- Environment variable validation
- Error message sanitization in production

## 📈 Performance Optimization

- Connection pooling with Neon serverless
- Efficient random query selection
- Minimal database calls per request
- Automatic request logging for monitoring

## 🚨 Troubleshooting

### Common Issues

**Database Connection Error:**
- Verify `NEON_DATABASE_URL` in `.env`
- Check Neon database is active
- Ensure SSL mode is enabled

**CORS Error:**
- Verify frontend URL in CORS origins
- Check if server is running on port 4000

**Migration Fails:**
- Run `npm run generate` after schema changes
- Ensure database permissions are correct

### Debug Mode
Set `NODE_ENV=development` for detailed error messages.

## 📊 Sample Data

The server automatically seeds the database with 8 sample quotes across 4 categories when started for the first time.

## 🔄 Development Workflow

1. Make schema changes in `src/db/schema.js`
2. Run `npm run generate` to create migrations
3. Run `npm run migrate` to apply changes
4. Test endpoints with health check
5. Integrate with Next.js frontend

---

**Backend Status:** ✅ Production Ready  
**Frontend Integration:** ✅ Compatible with Next.js  
**Database:** ✅ Neon Postgres with Drizzle ORM  
**API:** ✅ RESTful with proper error handling
