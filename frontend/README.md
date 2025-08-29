# Path Skill Finder - Frontend

A modern React frontend application for the Path Skill Finder platform, built with TypeScript, Tailwind CSS, and React Router.

## 🚀 Features

- **Modern React**: Built with React 18 and TypeScript
- **Beautiful UI**: Styled with Tailwind CSS and custom design system
- **Authentication**: JWT-based authentication with protected routes
- **AI Integration**: AI-powered learning recommendations and analytics
- **Responsive Design**: Mobile-first responsive design
- **Clean Architecture**: Well-organized component structure and state management

## 📁 Project Structure

```
frontend/
├── public/                    # Static assets
├── src/
│   ├── api/                   # API client and service functions
│   │   ├── apiClient.ts      # Axios client configuration
│   │   ├── userApi.ts        # User authentication API
│   │   ├── pathApi.ts        # Learning paths API
│   │   ├── stepApi.ts        # Learning steps API
│   │   └── aiApi.ts          # AI-powered features API
│   ├── components/           # Reusable UI components
│   │   ├── auth/            # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── paths/           # Path-related components
│   │   │   └── PathCard.tsx
│   │   ├── shared/          # Shared/common components
│   │   │   ├── Button.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── ai/              # AI-related components
│   ├── context/             # React Context providers
│   │   ├── AuthContext.tsx  # Authentication state
│   │   └── AIContext.tsx    # AI features state
│   ├── hooks/               # Custom React hooks
│   │   ├── useFetch.ts      # Generic data fetching
│   │   ├── usePaths.ts      # Path management
│   │   └── useSteps.ts      # Step management
│   ├── pages/               # Page components
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── ... (other pages)
│   ├── styles/              # Global styles
│   │   └── global.css       # Tailwind and custom styles
│   ├── App.tsx              # Main app component
│   └── main.tsx             # App entry point
├── .env                     # Environment variables
├── tailwind.config.js       # Tailwind CSS configuration
├── package.json             # Dependencies and scripts
├── index.html               # HTML template
└── README.md               # This file
```

## 🛠️ Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration.

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 🚦 Available Scripts

- **Development server:**
  ```bash
  npm run dev
  ```

- **Build for production:**
  ```bash
  npm run build
  ```

- **Preview production build:**
  ```bash
  npm run preview
  ```

- **Lint code:**
  ```bash
  npm run lint
  ```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |
| `VITE_APP_NAME` | Application name | `Path Skill Finder` |
| `VITE_ENABLE_AI_FEATURES` | Enable AI features | `true` |
| `VITE_DEBUG_MODE` | Enable debug mode | `true` |

## 🎨 Design System

### Colors
- **Primary**: Blue tones for main actions and branding
- **Secondary**: Gray tones for text and backgrounds
- **Success**: Green tones for positive actions
- **Warning**: Yellow/Orange tones for warnings
- **Danger**: Red tones for errors and destructive actions

### Components
- **Button**: Multiple variants (primary, secondary, success, danger)
- **Modal**: Reusable modal with backdrop and keyboard support
- **Loader**: Spinner with multiple sizes and colors
- **Card**: Consistent card layout with hover effects

### Typography
- **Inter**: Primary font family
- **JetBrains Mono**: Monospace font for code

## 🔐 Authentication

The app uses JWT-based authentication with the following features:

- **Login/Register**: Forms with validation
- **Protected Routes**: Automatic redirects for unauthenticated users
- **Token Management**: Automatic token refresh and storage
- **Logout**: Clean session termination

## 📡 API Integration

### API Client
- Axios-based HTTP client with interceptors
- Automatic JWT token attachment
- Error handling and token refresh
- Request/response logging

### Available APIs
- **User API**: Authentication, profile management
- **Path API**: Learning paths CRUD operations
- **Step API**: Learning steps and progress tracking
- **AI API**: AI-powered recommendations and analytics

## 🏗️ Architecture

### State Management
- **React Context**: For global state (Auth, AI)
- **Custom Hooks**: For data fetching and business logic
- **Local State**: For component-specific state

### Component Structure
- **Pages**: Top-level route components
- **Components**: Reusable UI components
- **Hooks**: Custom logic and data fetching
- **Context**: Global state providers

### Routing
- **React Router**: Client-side routing
- **Protected Routes**: Authentication-based route protection
- **Nested Routes**: Support for complex page structures

## 🎯 Key Features

### Dashboard
- Welcome message with user info
- Quick stats (completed steps, learning streak, active paths)
- AI recommendations section
- Popular learning paths
- Quick action buttons

### Authentication
- Login and registration forms
- Form validation with error messages
- Demo credentials for testing
- Password requirements display

### Learning Paths
- Path cards with progress indicators
- Category-based filtering
- Enrollment functionality
- Detailed path information

### AI Integration
- Personalized learning recommendations
- Progress analytics
- Study plan generation
- Skill gap identification

## 🔄 Development Workflow

1. **Component Development**: Create components in appropriate directories
2. **API Integration**: Add API calls in respective API files
3. **State Management**: Use context for global state, hooks for local logic
4. **Styling**: Use Tailwind classes with custom component styles
5. **Testing**: Test components and API integration

## 📱 Responsive Design

The app is fully responsive with:
- Mobile-first approach
- Breakpoint-specific layouts
- Touch-friendly interactions
- Optimized typography scaling

## 🚀 Deployment

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

3. **Configure environment variables** on your hosting platform

## 🤝 Contributing

1. Follow the established component structure
2. Use TypeScript for all new code
3. Maintain consistent styling with Tailwind
4. Add proper error handling
5. Update this README for new features

## 📦 Dependencies

### Core Dependencies
- `react` & `react-dom`: React framework
- `react-router-dom`: Client-side routing
- `axios`: HTTP client
- `tailwindcss`: Utility-first CSS framework

### Development Dependencies
- `typescript`: TypeScript compiler
- `@types/*`: Type definitions
- `vite`: Build tool and dev server
- `eslint`: Code linting

## 🔧 Customization

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/shared/Header.tsx`

### Adding New Components
1. Create component in appropriate directory under `src/components/`
2. Export from component file
3. Import and use in pages or other components

### API Integration
1. Add API methods in appropriate API file
2. Create custom hooks for data fetching
3. Use hooks in components

## 📝 License

MIT License - see LICENSE file for details
