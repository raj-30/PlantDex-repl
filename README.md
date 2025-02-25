# PlantDex - Plant Collection App

A web application for plant enthusiasts to identify, track, and manage their plant collections with interactive features and user-friendly design.

## Tech Stack

- Frontend: React + TypeScript
- Backend: Express.js
- Database: PostgreSQL
- ORM: Drizzle
- Styling: Tailwind CSS + shadcn/ui
- State Management: TanStack Query (React Query)

## Prerequisites

1. Node.js (v18 or higher)
2. PostgreSQL (v14 or higher)
3. VS Code
4. Git

## VS Code Setup

1. Install recommended VS Code extensions:
   - ESLint
   - Prettier
   - TypeScript and JavaScript Language Features
   - Tailwind CSS IntelliSense

2. Clone the repository:
```bash
git clone <your-repo-url>
cd plantdex
```

3. Install dependencies:
```bash
npm install
```

4. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
```

5. Set up the database:
```bash
# Create the database in PostgreSQL
createdb plantdex

# Push the schema to your database
npm run db:push
```

## Development

1. Start the development server:
```bash
npm run dev
```
This will start both the frontend and backend servers.

2. Access the application:
- Frontend: http://localhost:5000
- API endpoints: http://localhost:5000/api/*

## Project Structure

```
├── client/                 # Frontend code
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   └── pages/        # Page components
├── server/                # Backend code
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database operations
│   └── db.ts            # Database configuration
└── shared/               # Shared code
    └── schema.ts        # Database schema and types
```

## Features

1. Plant Identification
   - Upload plant images
   - Get plant information
   - Add to collection

2. Collection Management
   - View all collected plants
   - Remove plants from collection
   - View achievements

3. Database Integration
   - PostgreSQL for persistent storage
   - Drizzle ORM for type-safe database operations

## VS Code Development Tips

1. Use the integrated terminal in VS Code:
   - Press `` Ctrl + ` `` to open the terminal
   - Run `npm run dev` to start the development server

2. Debugging:
   - Use the VS Code debugger with the "Node.js: Auto Attach" feature
   - Add breakpoints in your code by clicking the line number

3. Source Control:
   - Use the Source Control panel (Ctrl+Shift+G) for Git operations
   - Stage, commit, and push changes directly from VS Code

4. TypeScript Features:
   - Hover over types to see their definitions
   - Use "Go to Definition" (F12) to navigate to type definitions
   - Use "Quick Fix" (Ctrl+.) for automatic imports and fixes

## Common Issues and Solutions

1. Database Connection:
   - Ensure PostgreSQL is running
   - Verify DATABASE_URL in .env file
   - Check database credentials

2. Node.js Version:
   - Use `nvm` (Node Version Manager) to switch Node.js versions if needed
   - The project requires Node.js v18 or higher

3. Port Conflicts:
   - If port 5000 is in use, you can modify it in `server/index.ts`

For any other issues, please check the project's issue tracker or create a new issue.