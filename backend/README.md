# Path Skill Finder - Backend API

A robust Node.js backend API for the Path Skill Finder platform, built with Express, TypeScript, and MongoDB.

## 🚀 Features

- **Clean Architecture**: Modular structure with separation of concerns
- **TypeScript**: Full type safety and modern JavaScript features
- **Express.js**: Fast and minimalist web framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **Security**: Helmet for security headers, CORS configuration
- **Error Handling**: Global error handler with proper error responses
- **Environment Configuration**: Dotenv for environment variables
- **Development Tools**: Hot reload with ts-node-dev

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Database and environment configuration
│   │   └── db.ts        # MongoDB connection setup
│   ├── models/          # Mongoose schemas and interfaces
│   │   └── user.model.ts # User schema definition
│   ├── services/        # Business logic layer
│   │   └── user.service.ts # User database operations
│   ├── controllers/     # Request/response handlers
│   │   └── user.controller.ts # User API endpoints
│   ├── routes/          # Route definitions
│   │   └── user.routes.ts # User route mappings
│   ├── middleware/      # Custom middleware
│   │   ├── auth.middleware.ts # JWT authentication
│   │   └── errorHandler.ts # Global error handling
│   ├── utils/           # Helper functions and constants
│   │   ├── constants.ts # HTTP status codes, messages
│   │   └── helpers.ts   # Utility functions
│   ├── app.ts           # Express app configuration
│   └── server.ts        # Server entry point
├── dist/                # Compiled JavaScript (generated)
├── .env.example         # Environment variables template
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🛠️ Installation

1. **Clone the repository and navigate to backend:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your actual configuration values.

4. **Start MongoDB:**
   Make sure MongoDB is running on your system or update `MONGODB_URI` in `.env` for a remote database.

## 🚦 Available Scripts

- **Development mode** (with hot reload):

  ```bash
  npm run dev
  ```

- **Build for production:**

  ```bash
  npm run build
  ```

- **Start production server:**

  ```bash
  npm start
  ```

- **Clean build directory:**
  ```bash
  npm run clean
  ```

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

| Variable      | Description                      | Default                                       |
| ------------- | -------------------------------- | --------------------------------------------- |
| `NODE_ENV`    | Environment mode                 | `development`                                 |
| `PORT`        | Server port                      | `5000`                                        |
| `MONGODB_URI` | MongoDB connection string        | `mongodb://localhost:27017/path-skill-finder` |
| `CLIENT_URL`  | Frontend URL for CORS            | `http://localhost:3000`                       |
| `JWT_SECRET`  | JWT secret key (for future auth) | -                                             |
| `JWT_EXPIRE`  | JWT expiration time              | `30d`                                         |

## 📡 API Endpoints

### Health Check

- **GET** `/api/health` - Check API status

### User Authentication

- **POST** `/api/users/register` - Register a new user
- **POST** `/api/users/login` - Login user
- **GET** `/api/users/profile` - Get user profile (protected)
- **PUT** `/api/users/profile` - Update user profile (protected)

### Path Management

- **POST** `/api/paths` - Create a new learning path (protected)
- **GET** `/api/paths` - Get all paths with optional filtering
- **GET** `/api/paths/:id` - Get path by ID with steps
- **GET** `/api/paths/category/:category` - Get paths by category
- **PUT** `/api/paths/:id` - Update path (protected)
- **DELETE** `/api/paths/:id` - Delete path (protected)
- **GET** `/api/paths/stats` - Get path statistics

### Step Management

- **POST** `/api/steps/:pathId` - Add step to path (protected)
- **GET** `/api/steps/path/:pathId` - Get steps by path ID (public)
- **PUT** `/api/steps/:id` - Update step (protected)
- **DELETE** `/api/steps/:id` - Delete step (protected)
- **PATCH** `/api/steps/:id/complete` - Mark step as completed (protected)
- **PATCH** `/api/steps/:id/incomplete` - Mark step as incomplete (protected)
- **GET** `/api/steps/completed` - Get user's completed steps (protected)
- **GET** `/api/steps/:id/stats` - Get step completion statistics (protected)

### AI Recommendations

- **POST** `/api/ai/suggest` - Generate personalized AI suggestions (protected)
- **GET** `/api/ai/analytics` - Get learning analytics (protected)
- **GET** `/api/ai/recommendations` - Get AI-powered recommendations (protected)
- **POST** `/api/ai/study-plan` - Generate personalized study plan (protected)

### Future Endpoints

- `/api/roadmaps` - Learning roadmaps
- `/api/skills` - Skills management

## 🔐 User Authentication

The User Authentication module provides complete user management functionality with JWT-based authentication.

### Features

- **User Registration**: Create new user accounts with email verification
- **User Login**: Authenticate users and generate JWT tokens
- **Profile Management**: Get and update user profiles
- **Password Security**: Bcrypt hashing for secure password storage
- **JWT Authentication**: Token-based authentication with expiration
- **Input Validation**: Comprehensive validation for all user inputs
- **Error Handling**: Proper error responses for various scenarios

### Authentication Flow

1. **Registration**: User provides name, email, password
2. **Password Hashing**: Password is hashed using bcrypt before storage
3. **Token Generation**: JWT token is generated upon successful registration/login
4. **Protected Routes**: JWT token required for accessing protected endpoints
5. **Token Verification**: Middleware validates tokens on protected routes

### Security Features

- Password hashing with bcrypt (12 salt rounds)
- JWT token expiration (configurable)
- Input validation and sanitization
- Duplicate email prevention
- Secure password requirements (minimum 8 characters)

## 📚 Path and Step Management

The Path and Step modules provide comprehensive learning path management functionality with progress tracking.

### Features

- **Path Management**: Create, read, update, and delete learning paths
- **Step Management**: Add, update, and delete steps within paths
- **Progress Tracking**: Mark steps as completed/incomplete by users
- **Category Organization**: Organize paths by categories (web-dev, mobile-dev, etc.)
- **Statistics**: Get completion statistics and path analytics
- **Resource Links**: Attach learning resources to steps
- **Order Management**: Maintain step order within paths

### Path Features

- **Path Creation**: Create learning paths with title, description, and category
- **Path Filtering**: Filter paths by category or get all paths
- **Path Statistics**: Get total paths and paths by category
- **Step Population**: Automatically populate steps when fetching paths
- **Virtual Properties**: Step count virtual property for easy access

### Step Features

- **Step Operations**: Full CRUD operations for steps
- **Completion Tracking**: Track which users have completed each step
- **Order Enforcement**: Unique step ordering within each path
- **Resource Management**: Store multiple resource links per step
- **Statistics**: Get completion statistics for individual steps
- **User Progress**: Get all completed steps for a specific user

### Data Relationships

- **Path → Steps**: One-to-many relationship (path contains multiple steps)
- **Step → Path**: Many-to-one relationship (step belongs to one path)
- **Step → Users**: Many-to-many relationship (users can complete steps)
- **User → Steps**: Many-to-many relationship (users can complete multiple steps)

### Validation Rules

- **Paths**: Title (3-100 chars), description (10-1000 chars), category (enum)
- **Steps**: Name (2-100 chars), description (10-1000 chars), order (≥1)
- **Resource Links**: Optional array of valid URLs
- **Unique Constraints**: Step order must be unique within each path

## 🤖 AI Recommendation System

The AI Recommendation module provides dynamic, personalized learning suggestions based on user progress, skills, and completed steps using intelligent algorithms and data analysis.

### Features

- **Personalized Suggestions**: Dynamic learning recommendations based on user progress
- **Skill Gap Analysis**: Identify and address learning gaps with targeted recommendations
- **Mini-Project Generation**: Create custom projects tailored to user progress and skill level
- **Learning Pattern Analysis**: Analyze user learning patterns (fast, steady, slow)
- **Personalized Learning Paths**: Reorder remaining steps based on skill level and difficulty
- **Progress Analytics**: Comprehensive learning analytics and insights
- **Study Plan Generation**: Create personalized study plans with milestones
- **Motivational Support**: Generate encouraging messages based on progress

### AI Capabilities

- **Progress Analysis**: Analyze completion rates, learning patterns, and time spent
- **Skill Assessment**: Evaluate user skills and identify areas for improvement
- **Content Personalization**: Adapt learning content based on user preferences
- **Project Recommendations**: Suggest relevant projects based on completed work
- **Time Estimation**: Provide realistic time estimates for learning activities
- **Resource Suggestions**: Recommend additional learning resources and materials

### AI Algorithms

- **Learning Pattern Detection**: Identify user learning speed and consistency
- **Skill Gap Identification**: Analyze performance to find knowledge gaps
- **Difficulty Adjustment**: Modify content difficulty based on user performance
- **Progress Prediction**: Estimate completion times and success rates
- **Personalization Engine**: Customize recommendations based on user data

### Data Analysis

- **Completion Tracking**: Monitor step completion and time spent
- **Performance Metrics**: Track success rates and learning efficiency
- **Pattern Recognition**: Identify learning habits and preferences
- **Progress Visualization**: Generate insights from learning data
- **Trend Analysis**: Analyze learning trends over time

### Integration Points

- **User Progress Data**: Leverages completion data from Step module
- **Path Information**: Uses path categories and difficulty levels
- **User Preferences**: Considers learning style and goals
- **Performance History**: Analyzes historical learning data
- **External Resources**: Integrates with learning resource databases

### Scalability Features

- **Modular Design**: Easy to add new AI algorithms and features
- **Extensible Framework**: Supports integration with external AI services
- **Performance Optimized**: Efficient data processing and analysis
- **Configurable Parameters**: Adjustable AI behavior and thresholds
- **Future-Ready Architecture**: Designed for advanced AI integrations

## 🏗️ Architecture

### Modular Structure

- **config/**: Database connections and configurations
- **modules/**: Feature-based organization (each feature has its own folder)
- **middleware/**: Reusable middleware functions
- **utils/**: Helper functions and constants

### Error Handling

- Global error handler with proper HTTP status codes
- Custom error types for different scenarios
- Development vs production error responses

### Security

- Helmet for security headers
- CORS configuration
- Request body size limits
- Input validation (to be added)

## 🔄 Development Workflow

1. **Start development server:**

   ```bash
   npm run dev
   ```

2. **The server will start on** `http://localhost:5000`

3. **Health check endpoint:** `http://localhost:5000/api/health`

4. **Hot reload** is enabled - changes will automatically restart the server

## 🧪 Testing

Testing setup will be added in future iterations with:

- Jest for unit testing
- Supertest for API testing
- Test database configuration

## 📦 Dependencies

### Production Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variables
- `cors` - Cross-origin resource sharing
- `helmet` - Security middleware
- `morgan` - HTTP request logger
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT token generation and verification

### Development Dependencies

- `typescript` - TypeScript compiler
- `ts-node-dev` - Development server with hot reload
- `@types/express` - Express type definitions
- `@types/node` - Node.js type definitions
- `@types/cors` - CORS type definitions
- `@types/morgan` - Morgan type definitions
- `@types/bcrypt` - Bcrypt type definitions
- `@types/jsonwebtoken` - JWT type definitions

## 🚀 Deployment

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Set production environment variables**

3. **Start the production server:**
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Follow the established project structure
2. Use TypeScript for all new code
3. Add proper error handling
4. Update this README for new features

## 📝 License

MIT License - see LICENSE file for details
