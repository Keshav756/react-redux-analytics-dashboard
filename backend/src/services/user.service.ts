import User, { IUser } from '../models/user.model';
import { CustomError } from '../middleware/errorHandler';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  };
  token: string;
}

export class UserService {
  /**
   * Create a new user
   */
  static async createUser(userData: CreateUserData): Promise<IUser> {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        const error = new Error('User with this email already exists') as CustomError;
        error.statusCode = 409;
        throw error;
      }

      // Create new user
      const user = new User(userData);
      await user.save();

      return user;
    } catch (error) {
      if ((error as CustomError).statusCode) {
        throw error;
      }

      const customError = new Error('Failed to create user') as CustomError;
      customError.statusCode = 500;
      throw customError;
    }
  }

  /**
   * Find user by email
   */
  static async findByEmail(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({ email }).select('+password');
    } catch (error) {
      const customError = new Error('Failed to find user') as CustomError;
      customError.statusCode = 500;
      throw customError;
    }
  }

  /**
   * Find user by ID
   */
  static async findById(id: string): Promise<IUser | null> {
    try {
      return await User.findById(id);
    } catch (error) {
      const customError = new Error('Failed to find user') as CustomError;
      customError.statusCode = 500;
      throw customError;
    }
  }

  /**
   * Validate user credentials
   */
  static async validateCredentials(email: string, password: string): Promise<IUser> {
    try {
      // Find user by email (include password for comparison)
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        const error = new Error('Invalid email or password') as CustomError;
        error.statusCode = 401;
        throw error;
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        const error = new Error('Invalid email or password') as CustomError;
        error.statusCode = 401;
        throw error;
      }

      return user;
    } catch (error) {
      if ((error as CustomError).statusCode) {
        throw error;
      }

      const customError = new Error('Authentication failed') as CustomError;
      customError.statusCode = 500;
      throw customError;
    }
  }

  /**
   * Get user profile (without password)
   */
  static async getUserProfile(userId: string): Promise<IUser | null> {
    try {
      return await User.findById(userId);
    } catch (error) {
      const customError = new Error('Failed to get user profile') as CustomError;
      customError.statusCode = 500;
      throw customError;
    }
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(userId: string, updateData: Partial<CreateUserData>): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );

      if (!user) {
        const error = new Error('User not found') as CustomError;
        error.statusCode = 404;
        throw error;
      }

      return user;
    } catch (error) {
      if ((error as CustomError).statusCode) {
        throw error;
      }

      const customError = new Error('Failed to update user profile') as CustomError;
      customError.statusCode = 500;
      throw customError;
    }
  }
}

export default UserService;
