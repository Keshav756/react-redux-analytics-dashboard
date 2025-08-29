import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from './errorHandler';
import UserService from '../services/user.service';
import { JwtPayload } from '../utils/helpers';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
      };
    }
  }
}

/**
 * Authentication middleware - verifies JWT token
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : null;

    if (!token) {
      const error = new Error('Access denied. No token provided.') as CustomError;
      error.statusCode = 401;
      return next(error);
    }

    // Verify token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      const error = new Error('JWT_SECRET is not configured') as CustomError;
      error.statusCode = 500;
      return next(error);
    }

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    // Get user from database
    const user = await UserService.findById(decoded.userId);
    if (!user) {
      const error = new Error('User not found') as CustomError;
      error.statusCode = 401;
      return next(error);
    }

    // Add user to request object
    req.user = {
      id: (user._id as any).toString(),
      name: user.name,
      email: user.email
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      const customError = new Error('Invalid token') as CustomError;
      customError.statusCode = 401;
      return next(customError);
    }

    if (error instanceof jwt.TokenExpiredError) {
      const customError = new Error('Token expired') as CustomError;
      customError.statusCode = 401;
      return next(customError);
    }

    const customError = new Error('Authentication failed') as CustomError;
    customError.statusCode = 500;
    next(customError);
  }
};

/**
 * Optional authentication middleware - doesn't fail if no token
 */
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : null;

    if (token) {
      const jwtSecret = process.env.JWT_SECRET;
      if (jwtSecret) {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        const user = await UserService.findById(decoded.userId);

        if (user) {
          req.user = {
            id: (user._id as any).toString(),
            name: user.name,
            email: user.email
          };
        }
      }
    }

    next();
  } catch (error) {
    // For optional auth, we don't fail on errors
    next();
  }
};

export default authenticate;
