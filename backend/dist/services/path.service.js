"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathService = void 0;
const path_model_1 = __importDefault(require("../models/path.model"));
const step_model_1 = __importDefault(require("../models/step.model"));
class PathService {
    static async createPath(pathData) {
        try {
            const path = new path_model_1.default(pathData);
            await path.save();
            return path;
        }
        catch (error) {
            if (error.name === "ValidationError") {
                const customError = new Error("Invalid path data");
                customError.statusCode = 400;
                throw customError;
            }
            const customError = new Error("Failed to create path");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async getAllPaths(category, limit = 10, skip = 0) {
        try {
            const filter = {};
            if (category) {
                filter.category = category;
            }
            const paths = await path_model_1.default.find(filter)
                .populate({
                path: "steps",
                select: "name order completedBy",
                options: { sort: { order: 1 } },
            })
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip);
            return paths;
        }
        catch (error) {
            const customError = new Error("Failed to fetch paths");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async getPathById(id) {
        try {
            const path = await path_model_1.default.findById(id).populate({
                path: "steps",
                populate: {
                    path: "completedBy",
                    select: "name email",
                },
                options: { sort: { order: 1 } },
            });
            if (!path) {
                const error = new Error("Path not found");
                error.statusCode = 404;
                throw error;
            }
            return path;
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            if (error.name === "CastError") {
                const customError = new Error("Invalid path ID");
                customError.statusCode = 400;
                throw customError;
            }
            const customError = new Error("Failed to fetch path");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async updatePath(id, updateData) {
        try {
            const path = await path_model_1.default.findByIdAndUpdate(id, { ...updateData, updatedAt: new Date() }, { new: true, runValidators: true }).populate({
                path: "steps",
                select: "name order",
                options: { sort: { order: 1 } },
            });
            if (!path) {
                const error = new Error("Path not found");
                error.statusCode = 404;
                throw error;
            }
            return path;
        }
        catch (error) {
            if (error.name === "ValidationError") {
                const customError = new Error("Invalid path data");
                customError.statusCode = 400;
                throw customError;
            }
            if (error.name === "CastError") {
                const customError = new Error("Invalid path ID");
                customError.statusCode = 400;
                throw customError;
            }
            const customError = new Error("Failed to update path");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async deletePath(id) {
        try {
            await step_model_1.default.deleteMany({ path: id });
            const path = await path_model_1.default.findByIdAndDelete(id);
            if (!path) {
                const error = new Error("Path not found");
                error.statusCode = 404;
                throw error;
            }
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            if (error.name === "CastError") {
                const customError = new Error("Invalid path ID");
                customError.statusCode = 400;
                throw customError;
            }
            const customError = new Error("Failed to delete path");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async getPathsByCategory(category) {
        try {
            const paths = await path_model_1.default.find({ category })
                .populate({
                path: "steps",
                select: "name order completedBy",
                options: { sort: { order: 1 } },
            })
                .sort({ createdAt: -1 });
            return paths;
        }
        catch (error) {
            const customError = new Error("Failed to fetch paths by category");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async searchPaths(filters = {}, pagination = {}) {
        try {
            const { category, difficulty, search, aiRelevance, userId } = filters;
            const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc", } = pagination;
            const query = {};
            if (category) {
                query.category = category;
            }
            if (search) {
                query.$or = [
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } },
                ];
            }
            if (aiRelevance && userId) {
            }
            const skip = (page - 1) * limit;
            const sortOptions = {};
            sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
            const [paths, total] = await Promise.all([
                path_model_1.default.find(query)
                    .populate({
                    path: "steps",
                    select: "name order completedBy",
                    options: { sort: { order: 1 } },
                })
                    .sort(sortOptions)
                    .limit(limit)
                    .skip(skip),
                path_model_1.default.countDocuments(query),
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
        }
        catch (error) {
            const customError = new Error("Failed to search paths");
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async getPathStats() {
        try {
            const totalPaths = await path_model_1.default.countDocuments();
            const categoryStats = await path_model_1.default.aggregate([
                {
                    $group: {
                        _id: "$category",
                        count: { $sum: 1 },
                    },
                },
            ]);
            const pathsByCategory = {};
            categoryStats.forEach((stat) => {
                pathsByCategory[stat._id] = stat.count;
            });
            return {
                totalPaths,
                pathsByCategory,
            };
        }
        catch (error) {
            const customError = new Error("Failed to get path statistics");
            customError.statusCode = 500;
            throw customError;
        }
    }
}
exports.PathService = PathService;
exports.default = PathService;
//# sourceMappingURL=path.service.js.map