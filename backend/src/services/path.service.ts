import Path, { IPath } from "../models/path.model";
import Step from "../models/step.model";
import { CustomError } from "../middleware/errorHandler";

export interface CreatePathData {
  title: string;
  description: string;
  category: string;
}

export interface UpdatePathData {
  title?: string;
  description?: string;
  category?: string;
}

export interface PathFilters {
  category?: string;
  difficulty?: string;
  search?: string;
  aiRelevance?: string;
  userId?: string; // For AI-based recommendations
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export class PathService {
  /**
   * Create a new path
   */
  static async createPath(pathData: CreatePathData): Promise<IPath> {
    try {
      const path = new Path(pathData);
      await path.save();
      return path;
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const customError = new Error("Invalid path data") as CustomError;
        customError.statusCode = 400;
        throw customError;
      }

      const customError = new Error("Failed to create path") as CustomError;
      customError.statusCode = 500;
      throw customError;
    }
  }

  /**
   * Get all paths with optional filtering
   */
  static async getAllPaths(
    category?: string,
    limit: number = 10,
    skip: number = 0
  ): Promise<IPath[]> {
    try {
      const filter: any = {};
      if (category) {
        filter.category = category;
      }

      const paths = await Path.find(filter)
        .populate({
          path: "steps",
          select: "name order completedBy",
          options: { sort: { order: 1 } },
        })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip);

      return paths;
    } catch (error) {
      const customError = new Error("Failed to fetch paths") as CustomError;
      customError.statusCode = 500;
      throw customError;
    }
  }

  /**
   * Get path by ID with populated steps
   */
  static async getPathById(id: string): Promise<IPath | null> {
    try {
      const path = await Path.findById(id).populate({
        path: "steps",
        populate: {
          path: "completedBy",
          select: "name email",
        },
        options: { sort: { order: 1 } },
      });

      if (!path) {
        const error = new Error("Path not found") as CustomError;
        error.statusCode = 404;
        throw error;
      }

      return path;
    } catch (error: any) {
      if (error.statusCode) {
        throw error;
      }

      if (error.name === "CastError") {
        const customError = new Error("Invalid path ID") as CustomError;
        customError.statusCode = 400;
        throw customError;
      }

      const customError = new Error("Failed to fetch path") as CustomError;
      customError.statusCode = 500;
      throw customError;
    }
  }

  /**
   * Update path by ID
   */
  static async updatePath(
    id: string,
    updateData: UpdatePathData
  ): Promise<IPath | null> {
    try {
      const path = await Path.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).populate({
        path: "steps",
        select: "name order",
        options: { sort: { order: 1 } },
      });

      if (!path) {
        const error = new Error("Path not found") as CustomError;
        error.statusCode = 404;
        throw error;
      }

      return path;
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const customError = new Error("Invalid path data") as CustomError;
        customError.statusCode = 400;
        throw customError;
      }

      if (error.name === "CastError") {
        const customError = new Error("Invalid path ID") as CustomError;
        customError.statusCode = 400;
        throw customError;
      }

      const customError = new Error("Failed to update path") as CustomError;
      customError.statusCode = 500;
      throw customError;
    }
  }

  /**
   * Delete path by ID
   */
  static async deletePath(id: string): Promise<void> {
    try {
      // First, delete all steps associated with this path
      await Step.deleteMany({ path: id });

      // Then delete the path
      const path = await Path.findByIdAndDelete(id);

      if (!path) {
        const error = new Error("Path not found") as CustomError;
        error.statusCode = 404;
        throw error;
      }
    } catch (error: any) {
      if (error.statusCode) {
        throw error;
      }

      if (error.name === "CastError") {
        const customError = new Error("Invalid path ID") as CustomError;
        customError.statusCode = 400;
        throw customError;
      }

      const customError = new Error("Failed to delete path") as CustomError;
      customError.statusCode = 500;
      throw customError;
    }
  }

  /**
   * Get paths by category
   */
  static async getPathsByCategory(category: string): Promise<IPath[]> {
    try {
      const paths = await Path.find({ category })
        .populate({
          path: "steps",
          select: "name order completedBy",
          options: { sort: { order: 1 } },
        })
        .sort({ createdAt: -1 });

      return paths;
    } catch (error) {
      const customError = new Error(
        "Failed to fetch paths by category"
      ) as CustomError;
      customError.statusCode = 500;
      throw customError;
    }
  }

  /**
   * Search and filter paths with advanced options
   */
  static async searchPaths(
    filters: PathFilters = {},
    pagination: PaginationOptions = {}
  ): Promise<{
    paths: IPath[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }> {
    try {
      const { category, difficulty, search, aiRelevance, userId } = filters;

      const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = pagination;

      // Build MongoDB query
      const query: any = {};

      // Category filter
      if (category) {
        query.category = category;
      }

      // Search filter (title and description)
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }

      // AI relevance filter (placeholder for future AI-based filtering)
      if (aiRelevance && userId) {
        // This would integrate with AI service to get personalized recommendations
        // For now, we'll use a simple approach based on user's learning history
        // In a real implementation, this would call an AI service
      }

      // Calculate pagination
      const skip = (page - 1) * limit;
      const sortOptions: any = {};
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

      // Execute query with pagination
      const [paths, total] = await Promise.all([
        Path.find(query)
          .populate({
            path: "steps",
            select: "name order completedBy",
            options: { sort: { order: 1 } },
          })
          .sort(sortOptions)
          .limit(limit)
          .skip(skip),
        Path.countDocuments(query),
      ]);

      const totalPages = Math.ceil(total / limit);
      const hasNext = page < totalPages;
      const hasPrev = page > 1;

      return {
        paths,
        total,
        page,
        limit,
        totalPages,
        hasNext,
        hasPrev,
      };
    } catch (error) {
      const customError = new Error("Failed to search paths") as CustomError;
      customError.statusCode = 500;
      throw customError;
    }
  }

  /**
   * Get path statistics
   */
  static async getPathStats(): Promise<{
    totalPaths: number;
    pathsByCategory: Record<string, number>;
  }> {
    try {
      const totalPaths = await Path.countDocuments();

      const categoryStats = await Path.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
      ]);

      const pathsByCategory: Record<string, number> = {};
      categoryStats.forEach((stat) => {
        pathsByCategory[stat._id] = stat.count;
      });

      return {
        totalPaths,
        pathsByCategory,
      };
    } catch (error) {
      const customError = new Error(
        "Failed to get path statistics"
      ) as CustomError;
      customError.statusCode = 500;
      throw customError;
    }
  }
}

export default PathService;
