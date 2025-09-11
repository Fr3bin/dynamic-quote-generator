# Dynamic Quote Generator - Heng Lyhour

A professional full-stack quote generator application featuring real quotes from KIT students, built with modern web technologies.

## 🚀 Features

- **Dynamic Quote Generation**: Access 36 authentic quotes from 9 KIT students
- **Smart Filtering**: Filter by author and quote category (Motivational, Fun, Love, KITian, Wisdom)
- **Professional UI**: Clean, dark theme with pixel-perfect design
- **Responsive Design**: Optimized for all screen sizes
- **Real-time Updates**: Instant quote generation without page refresh
- **Scrollable Selectors**: Elegant dropdown with scrollable author selection

## 🛠 Tech Stack

### Frontend
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - Modern React with latest features
- **TypeScript** - Full type safety and better developer experience
- **Tailwind CSS 4** - Utility-first CSS framework
- **Poppins & Jaini Purva** - Professional typography

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Drizzle ORM** - Type-safe database operations
- **Neon PostgreSQL** - Serverless PostgreSQL database
- **CORS** - Cross-origin resource sharing support

## 🏗 Architecture

```
├── src/                    # Frontend source code
│   ├── app/               # Next.js App Router pages
│   ├── components/        # Reusable React components
│   └── lib/              # Utilities and constants
├── backend/              # Backend API server
│   └── src/             # Backend source code
│       ├── db/          # Database configuration and schema
│       └── index.js     # Express server entry point
└── public/              # Static assets
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (Neon recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fr3bin/dynamic-quote-generator.git
   cd dynamic-quote-generator
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Configure environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database URL
   ```

5. **Run the development servers**
   
   Terminal 1 (Backend):
   ```bash
   cd backend
   npm start
   ```
   
   Terminal 2 (Frontend):
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

## 📡 API Endpoints

- `GET /api/quote` - Get random quote with optional filters
- `GET /api/categories` - Get available quote categories
- `GET /health` - Health check endpoint
- `POST /api/quote` - Add new quote (admin functionality)

## 🎨 Design Features

- **Professional Color Scheme**: Dark theme with carefully chosen contrast ratios
- **Custom Components**: Modular, reusable UI components
- **Smooth Interactions**: Loading states and transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- KIT students who contributed authentic quotes
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
