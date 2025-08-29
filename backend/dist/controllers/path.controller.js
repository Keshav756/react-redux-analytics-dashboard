"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathController = void 0;
const path_service_1 = __importDefault(require("../services/path.service"));
const helpers_1 = require("../utils/helpers");
const constants_1 = require("../utils/constants");
class PathController {
    static async createPath(req, res, next) {
        try {
            const { title, description, category } = req.body;
            if (!title || !description || !category) {
                (0, helpers_1.sendErrorResponse)(res, "Title, description, and category are required", constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            const path = await path_service_1.default.createPath({
                title,
                description,
                category,
            });
            (0, helpers_1.sendSuccessResponse)(res, "Path created successfully", {
                path: {
                    id: path.id,
                    title: path.title,
                    description: path.description,
                    category: path.category,
                    steps: path.steps,
                    stepCount: path.stepCount,
                    createdAt: path.createdAt,
                    updatedAt: path.updatedAt,
                },
            }, constants_1.HTTP_STATUS.CREATED);
        }
        catch (error) {
            if (error.message === "Invalid path data") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Failed to create path", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async searchPaths(req, res, next) {
        try {
            const { category, difficulty, search, aiRelevance, page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc", } = req.query;
            const filters = {};
            if (category)
                filters.category = category;
            if (difficulty)
                filters.difficulty = difficulty;
            if (search)
                filters.search = search;
            if (aiRelevance)
                filters.aiRelevance = aiRelevance;
            if (req.user) {
                filters.userId = req.user.id;
            }
            const paginationOptions = {
                page: parseInt(page, 10) || 1,
                limit: Math.min(parseInt(limit, 10) || 10, 100),
                sortBy: sortBy,
                sortOrder: sortOrder === "asc"
                    ? "asc"
                    : "desc",
            };
            const result = await path_service_1.default.searchPaths(filters, paginationOptions);
            (0, helpers_1.sendSuccessResponse)(res, "Paths retrieved successfully", {
                paths: result.paths.map((path) => ({
                    id: path.id,
                    title: path.title,
                    description: path.description,
                    category: path.category,
                    stepCount: path.stepCount,
                    steps: path.steps,
                    createdAt: path.createdAt,
                    updatedAt: path.updatedAt,
                })),
                pagination: {
                    total: result.total,
                    page: result.page,
                    limit: result.limit,
                    totalPages: result.totalPages,
                    hasNext: result.hasNext,
                    hasPrev: result.hasPrev,
                },
            });
        }
        catch (error) {
            (0, helpers_1.sendErrorResponse)(res, "Failed to search paths", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async getPathById(req, res, next) {
        try {
            const { id } = req.params;
            const path = await path_service_1.default.getPathById(id);
            (0, helpers_1.sendSuccessResponse)(res, "Path retrieved successfully", {
                path: {
                    id: path.id,
                    title: path.title,
                    description: path.description,
                    category: path.category,
                    stepCount: path.stepCount,
                    steps: path.steps,
                    createdAt: path.createdAt,
                    updatedAt: path.updatedAt,
                },
            });
        }
        catch (error) {
            if (error.message === "Path not found") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.NOT_FOUND);
                return;
            }
            if (error.message === "Invalid path ID") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Failed to fetch path", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async updatePath(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const path = await path_service_1.default.updatePath(id, updateData);
            (0, helpers_1.sendSuccessResponse)(res, "Path updated successfully", {
                path: {
                    id: path.id,
                    title: path.title,
                    description: path.description,
                    category: path.category,
                    stepCount: path.stepCount,
                    steps: path.steps,
                    createdAt: path.createdAt,
                    updatedAt: path.updatedAt,
                },
            });
        }
        catch (error) {
            if (error.message === "Path not found") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.NOT_FOUND);
                return;
            }
            if (error.message === "Invalid path data" ||
                error.message === "Invalid path ID") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Failed to update path", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async deletePath(req, res, next) {
        try {
            const { id } = req.params;
            await path_service_1.default.deletePath(id);
            (0, helpers_1.sendSuccessResponse)(res, "Path deleted successfully");
        }
        catch (error) {
            if (error.message === "Path not found") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.NOT_FOUND);
                return;
            }
            if (error.message === "Invalid path ID") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Failed to delete path", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async getPathsByCategory(req, res, next) {
        try {
            const { category } = req.params;
            const paths = await path_service_1.default.getPathsByCategory(category);
            (0, helpers_1.sendSuccessResponse)(res, "Paths retrieved successfully", {
                paths: paths.map((path) => ({
                    id: path.id,
                    title: path.title,
                    description: path.description,
                    category: path.category,
                    stepCount: path.stepCount,
                    steps: path.steps,
                    createdAt: path.createdAt,
                    updatedAt: path.updatedAt,
                })),
                total: paths.length,
            });
        }
        catch (error) {
            (0, helpers_1.sendErrorResponse)(res, "Failed to fetch paths by category", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async getPathStats(req, res, next) {
        try {
            const stats = await path_service_1.default.getPathStats();
            (0, helpers_1.sendSuccessResponse)(res, "Path statistics retrieved successfully", {
                stats,
            });
        }
        catch (error) {
            (0, helpers_1.sendErrorResponse)(res, "Failed to get path statistics", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.PathController = PathController;
exports.default = PathController;
//# sourceMappingURL=path.controller.js.map