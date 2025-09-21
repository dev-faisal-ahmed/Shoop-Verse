## Shop-Verse

A comprehensive e-commerce backend API built with NestJS, featuring user authentication, product management, category management, and comprehensive API documentation.

## 🚀 Features

- **User Authentication**: JWT-based authentication with refresh tokens
- **Product Management**: CRUD operations for products with image upload support
- **Category Management**: Hierarchical category system
- **Search Functionality**: Full-text search across products
- **API Documentation**: Comprehensive Swagger/OpenAPI documentation
- **Database Integration**: Optimized for PostgreSQL with Prisma
- **File Upload**: Support for product images
- **Validation**: Comprehensive input validation using class-validator

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 18.x or higher
- **npm**: Version 8.x or higher (comes with Node.js)
- **PostgreSQL**: Version 13.x or higher
- **Git**: For version control

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd shop-verse
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# DB
DATABASE_URL=""

# Access Token
ACCESS_TOKEN_SECRET=""
ACCESS_TOKEN_EXPIRES_IN=""
REFRESH_TOKEN_SECRET=""
REFRESH_TOKEN_EXPIRES_IN=""

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

### 4. Database Setup

1. Create a PostgreSQL database or use any hosted database url

2. Run database migrations and generate the types:

```bash
npm run db:migrate
npm run db:generate
```

### 5. Start the Application

#### Development Mode (with hot reload)

```bash
npm run start:dev
```

#### Production Mode

```bash
npm run build
npm run start:prod
```

The application will be available at `http://localhost:3000`

## 🌐 Live Deployment

### Production API Access

**Base URL**: `https://your-api-domain.com` (Replace with your actual domain)

### API Documentation (Live)

- **Swagger UI**: `https://your-api-domain.com/api/docs`

## 📚 API Documentation

Once the application is running, you can access the comprehensive API documentation at:

**Swagger UI**: http://localhost:3000/api/docs

This interactive documentation includes:

- All available endpoints
- Request/response schemas
- Example requests and responses
- Authentication requirements

## 🧪 Testing

### Run Unit Tests

```bash
npm run test
```

### Run E2E Tests

```bash
npm run test:e2e
```

### Run Tests with Coverage

```bash
npm run test:cov
```

## 🔧 Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production mode
- `npm run build` - Build the application
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint and fix code
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage report
- `npm run test:debug` - Debug tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run db:migrate` - Run Prisma migrations
- `npm run db:generate` - Generate Prisma client
- `npm run postinstall` - Generate Prisma client after install

## 🚀 Production Deployment

### Environment Setup

Ensure all production environment variables are set:

```env
# DB
DATABASE_URL=""

# Access Token
ACCESS_TOKEN_SECRET=""
ACCESS_TOKEN_EXPIRES_IN=""
REFRESH_TOKEN_SECRET=""
REFRESH_TOKEN_EXPIRES_IN=""

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

### Database Migration

Run migrations in production:

```bash
npm run db:migrate
```

### Build and Deploy

```bash
# Build the application
npm run build

# Start the production server
npm run start:prod
```

## 📋 Project Structure Overview

### **🏗️ Architecture Pattern**

- **Clean Architecture** with separation of concerns:
  - `domain/` - Entities
  - `infrastructure/` - External concerns (database, APIs)
  - `modules/` - Feature-based modules
  - `common/` - Shared utilities and configurations

### **🎯 Key Features**

- **Authentication Module** - JWT-based auth with refresh tokens
- **Category Management** - CRUD operations with business logic
- **Product Management** - Full product lifecycle with search
- **Database Integration** - Prisma ORM with PostgreSQL
- **File Upload** - Cloudinary integration for images
- **API Documentation** - Comprehensive Swagger/OpenAPI docs
- **Validation** - Request validation with class-validator

### **🗂️ Module Structure**

Each module follows a consistent pattern:

- `controller.ts` - HTTP endpoints and routing
- `module.ts` - Dependency injection configuration
- `doc.ts` - Swagger documentation definitions
- `dto/` - Data Transfer Objects
- `application/` - Application services (use cases)

This structure promotes maintainability, testability, and scalability while following Domain-Driven Design principles.

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register**: `POST /auth/register`
2. **Login**: `POST /auth/login` (sets refresh token cookie)
3. **Refresh Token**: `GET /auth/access-token` (requires refresh token cookie)
4. **Protected Routes**: Include `Authorization: Bearer <access_token>` header

## 📞 API Endpoints Overview

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/access-token` - Refresh access token

### Categories

- `GET /categories` - List all categories
- `GET /categories/:id` - Get category details
- `POST /categories` - Create new category (Admin)
- `PUT /categories/:id` - Update category (Admin)
- `DELETE /categories/:id` - Delete category (Admin)

### Products

- `GET /products` - List products with filters
- `GET /products/search` - Search products
- `GET /products/:id` - Get product details
- `POST /products` - Create new product (Admin)
- `PUT /products/:id` - Update product (Admin)
- `DELETE /products/:id` - Delete product (Admin)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run formatting: `npm run format`
5. Run linting: `npm run lint`
6. Commit your changes: `git commit -am 'Add feature'`
7. Push to the branch: `git push origin feature-name`
8. Submit a pull request

## 📄 License

This project is licensed under the UNLICENSED License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the API documentation at `/api/docs`
2. Review the project issues on GitHub
3. Create a new issue with detailed information

---

**Happy coding! 🎉**
