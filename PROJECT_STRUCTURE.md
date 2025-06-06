# Project Structure Documentation

This document outlines the structure of the backend project.

## Root Directory Structure

```
├── src/                    # Source code directory
├── public/                 # Public assets directory
├── node_modules/          # Node.js dependencies
├── package.json           # Project configuration and dependencies
├── package-lock.json      # Locked dependencies versions
├── .sequelizerc           # Sequelize CLI configuration
├── README.md              # Project documentation
├── .gitignore            # Git ignore rules
└── .gitattributes        # Git attributes configuration
```

## Source Code Structure (`src/`)

```
src/
├── app.js                 # Main application setup
├── index.js              # Application entry point
├── middlewares.js        # Global middleware configurations
├── routes/               # API route definitions
├── controller/           # Request handlers and business logic
├── services/            # Business logic and data processing
├── models/              # Database models
├── migrations/          # Database migration files
├── middlewares/         # Custom middleware functions
├── config/              # Configuration files
└── common/              # Shared utilities and helpers
```

## Key Components

### Database Structure

- The project uses Sequelize as the ORM
- Database migrations are stored in `src/migrations/`
- Models are defined in `src/models/`

### API Structure

- Routes are defined in `src/routes/`
- Controllers handle request processing in `src/controller/`
- Business logic is separated into `src/services/`

### Configuration

- Application configuration is managed in `src/config/`
- Middleware configurations are in `src/middlewares.js`

### Common Utilities

- Shared code and utilities are stored in `src/common/`

## Database Models

The project includes several database models:

- Tasks
- Users
- Categories

Each model has its corresponding migration file in the `migrations` directory.

## Getting Started

1. Install dependencies: `npm install`
2. Configure database settings in `src/config/`
3. Run migrations: `npx sequelize-cli db:migrate`
4. Start the server: `npm start`
