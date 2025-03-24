<p align="center">
  <h1 align="center">Gesture Therapy Backend</h1>
</p>

<p align="center">A NestJS-based backend service for the Gesture Therapy platform.</p>

## Description

This is the backend service for Gesture Therapy, built using the NestJS framework. It provides user authentication, therapy management, and other core functionalities required for the Gesture Therapy platform.

## Features

- User authentication and authorization
- User management system
- Therapy session handling
- Institution management
- Secure API endpoints
- PostgreSQL database integration

## Prerequisites

- Node.js (v20 or higher)
- PostgreSQL
- npm or yarn

## Installation

```bash
$ npm install
```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
JWT_SECRET="your-secret-key"
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

The API documentation will be available at `/api/docs` once the application is running (if Swagger is implemented).

## Database Migrations

To run database migrations:

```bash
# Generate migration
$ npx prisma migrate dev

# Apply migrations
$ npx prisma migrate deploy
```

## Project Structure
