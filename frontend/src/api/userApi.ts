import { api } from './apiClient';

// Types for user API
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
}

export interface UserProgress {
  completedCount: number;
  totalSteps: number;
  completionRate: number;
  remainingSteps: Array<{
    id: string;
    name: string;
    order: number;
  }>;
}

// User API methods
export const userApi = {
  // Register a new user
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/users/register', userData);
    return response.data.data; // Extract data from the wrapped response
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/users/login', credentials);
    return response.data.data; // Extract data from the wrapped response
  },

  // Get user profile
  getProfile: async (): Promise<User> => {
    const response = await api.get('/users/profile');
    return response.data.data.user; // Extract user from the wrapped response
  },

  // Update user profile
  updateProfile: async (updateData: UpdateProfileData): Promise<User> => {
    const response = await api.put('/users/profile', updateData);
    return response.data.data.user; // Extract user from the wrapped response
  },

  // Get user progress for a specific path
  getUserProgress: async (userId: string, pathId: string): Promise<UserProgress> => {
    const response = await api.get(`/users/${userId}/progress?pathId=${pathId}`);
    return response.data.data; // Extract data from the wrapped response
  },
};

export default userApi;
