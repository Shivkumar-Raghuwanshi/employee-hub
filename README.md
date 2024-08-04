# Employee Hub

Employee Hub is a comprehensive employee management system designed to streamline HR processes and enhance workplace efficiency. Built with cutting-edge web technologies, it offers a robust and user-friendly interface for managing employee data, tracking performance, and facilitating communication within your organization.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Database Management](#database-management)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Employee Profile Management
- Attendance Tracking (under developement)
- Performance Evaluation (under developement)
- Leave Management (under developement)
- Document Repository (under developement)
- Internal Communication Tools (under developement)
- Reporting and Analytics Dashboard (under developement)
- Role-based Access Control (under developement)

## Tech Stack

- **Frontend:**
  - Next.js 14.2.5: React framework for building user interfaces
  - TypeScript: Typed superset of JavaScript for improved developer experience
  - Tailwind CSS: Utility-first CSS framework for rapid UI development
  - Shadcn UI: Customizable UI component library

- **Backend:**
  - Next.js API Routes: Serverless API endpoints
  - Prisma ORM: Next-generation ORM for Node.js and TypeScript

- **Database:**
  - Supabase: Open-source Firebase alternative, providing PostgreSQL database

- **Authentication:**
  - Clerk: Complete user management solution

- **Deployment:**
  - Vercel: Platform for deploying and scaling Next.js applications

## Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (v20.0.0 or higher)
- npm (v10.0.0 or higher) 
- Git

## Installation

1. Clone the repository:
- git clone https://github.com/Shivkumar-Raghuwanshi/employee-hub.git

2. Navigate to the project directory:
- cd employee-hub

3. Install dependencies:
- npm install


## Configuration

1. Create a `.env.local` file in the root directory of the project.

2. Add the following environment variables:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
DATABASE_URL=
DIRECT_URL=
                
## Running the Application

To run the application in development mode:
- npm run dev

The application will be available at `http://localhost:3000`.

## Database Management

This project uses Prisma ORM for database management. To set up and manage your database:

1. Generate Prisma client:
- npx prisma generate
2. Run database migrations:
- npx prisma migrate dev
3. To view and manage your data, use Prisma Studio:
- npx prisma studio

## Authentication

Employee Hub uses Clerk for user authentication and management. Refer to the [Clerk documentation](https://clerk.dev/docs) for detailed information on setting up and customizing authentication flows.

## Deployment

This project is configured for seamless deployment on Vercel:

1. Connect your GitHub repository to Vercel.
2. Configure the environment variables in your Vercel project settings.
3. Deploy the application.

Vercel will automatically build and deploy your application on every push to the main branch.

## Contributing

We welcome contributions to Employee Hub! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the [MIT License](LICENSE).