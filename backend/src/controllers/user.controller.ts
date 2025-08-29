import { Request, Response, NextFunction } from "express";
import UserService, { CreateUserData, LoginData } from "../services/user.service";
import { generateToken, sendSuccessResponse, sendErrorResponse } from "../utils/helpers";
import { HTTP_STATUS } from "../utils/constants";

export class UserController {
  /**
   * Register a new user
   * POST /api/users/register
   */
  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, password }: CreateUserData = req.body;

      // Validate required fields
      if (!name || !email || !password) {
        sendErrorResponse(
          res,
          "Name, email, and password are required",
          HTTP_STATUS.BAD_REQUEST
        );
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        sendErrorResponse(
          res,
          "Please provide a valid email address",
          HTTP_STATUS.BAD_REQUEST
        );
        return;
      }

      // Validate password length
      if (password.length < 8) {
        sendErrorResponse(
          res,
          "Password must be at least 8 characters long",
          HTTP_STATUS.BAD_REQUEST
        );
        return;
      }

      // Create user
      const user = await UserService.createUser({ name, email, password });

      // Generate JWT token
      const token = generateToken((user._id as any).toString(), user.email);

      // Send response
      sendSuccessResponse(
        res,
        "User registered successfully",
        {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
          },
          token,
        },
        HTTP_STATUS.CREATED
      );
    } catch (error: any) {
      // Handle specific errors
      if (error.message === "User with this email already exists") {
        sendErrorResponse(res, error.message, HTTP_STATUS.CONFLICT);
        return;
      }

      // Handle validation errors
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map(
          (err: any) => err.message
        );
        sendErrorResponse(res, messages.join(", "), HTTP_STATUS.BAD_REQUEST);
        return;
      }

      // Handle other errors
      sendErrorResponse(
        res,
        "Failed to register user",
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Login user
   * POST /api/users/login
   */
  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password }: LoginData = req.body;

      // Validate required fields
      if (!email || !password) {
        sendErrorResponse(
          res,
          "Email and password are required",
          HTTP_STATUS.BAD_REQUEST
        );
        return;
      }

      // Validate credentials
      const user = await UserService.validateCredentials(email, password);

      // Generate JWT token
      const userId = (user._id as any).toString();
      console.log('Generating token for user:', { userId, email: user.email });
      const token = generateToken(userId, user.email);
      console.log('Generated token:', token ? 'SUCCESS' : 'FAILED');

      // Send response
      sendSuccessResponse(res, "Login successful", {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
        token,
      });
    } catch (error: any) {
      // Handle authentication errors
      if (error.message === "Invalid email or password") {
        sendErrorResponse(res, error.message, HTTP_STATUS.UNAUTHORIZED);
        return;
      }

      // Handle other errors
      sendErrorResponse(res, "Login failed", HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get user profile
   * GET /api/users/profile
   */
  static async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        sendErrorResponse(
          res,
          "User not authenticated",
          HTTP_STATUS.UNAUTHORIZED
        );
        return;
      }

      const user = await UserService.getUserProfile(req.user.id);

      if (!user) {
        sendErrorResponse(res, "User not found", HTTP_STATUS.NOT_FOUND);
        return;
      }

      sendSuccessResponse(res, "Profile retrieved successfully", {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error: any) {
      sendErrorResponse(
        res,
        "Failed to get profile",
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Update user profile
   * PUT /api/users/profile
   */
  static async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        sendErrorResponse(
          res,
          "User not authenticated",
          HTTP_STATUS.UNAUTHORIZED
        );
        return;
      }

      const { name, email } = req.body;
      const updateData: Partial<CreateUserData> = {};

      if (name) updateData.name = name;
      if (email) updateData.email = email;

      // Validate email format if provided
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          sendErrorResponse(
            res,
            "Please provide a valid email address",
            HTTP_STATUS.BAD_REQUEST
          );
          return;
        }
      }

      const user = await UserService.updateUserProfile(req.user.id, updateData);

      if (!user) {
        sendErrorResponse(res, "User not found", HTTP_STATUS.NOT_FOUND);
        return;
      }

      sendSuccessResponse(res, "Profile updated successfully", {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error: any) {
      // Handle duplicate email error
      if (error.message && error.message.includes("duplicate key")) {
        sendErrorResponse(res, "Email already exists", HTTP_STATUS.CONFLICT);
        return;
      }

      // Handle validation errors
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map(
          (err: any) => err.message
        );
        sendErrorResponse(res, messages.join(", "), HTTP_STATUS.BAD_REQUEST);
        return;
      }

      sendErrorResponse(
        res,
        "Failed to update profile",
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default UserController;
