"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = __importDefault(require("../services/user.service"));
const helpers_1 = require("../utils/helpers");
const constants_1 = require("../utils/constants");
class UserController {
    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                (0, helpers_1.sendErrorResponse)(res, "Name, email, and password are required", constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                (0, helpers_1.sendErrorResponse)(res, "Please provide a valid email address", constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            if (password.length < 8) {
                (0, helpers_1.sendErrorResponse)(res, "Password must be at least 8 characters long", constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            const user = await user_service_1.default.createUser({ name, email, password });
            const token = (0, helpers_1.generateToken)(user._id.toString(), user.email);
            (0, helpers_1.sendSuccessResponse)(res, "User registered successfully", {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                },
                token,
            }, constants_1.HTTP_STATUS.CREATED);
        }
        catch (error) {
            if (error.message === "User with this email already exists") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.CONFLICT);
                return;
            }
            if (error.name === "ValidationError") {
                const messages = Object.values(error.errors).map((err) => err.message);
                (0, helpers_1.sendErrorResponse)(res, messages.join(", "), constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Failed to register user", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                (0, helpers_1.sendErrorResponse)(res, "Email and password are required", constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            const user = await user_service_1.default.validateCredentials(email, password);
            const userId = user._id.toString();
            console.log('Generating token for user:', { userId, email: user.email });
            const token = (0, helpers_1.generateToken)(userId, user.email);
            console.log('Generated token:', token ? 'SUCCESS' : 'FAILED');
            (0, helpers_1.sendSuccessResponse)(res, "Login successful", {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                },
                token,
            });
        }
        catch (error) {
            if (error.message === "Invalid email or password") {
                (0, helpers_1.sendErrorResponse)(res, error.message, constants_1.HTTP_STATUS.UNAUTHORIZED);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Login failed", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async getProfile(req, res, next) {
        try {
            if (!req.user) {
                (0, helpers_1.sendErrorResponse)(res, "User not authenticated", constants_1.HTTP_STATUS.UNAUTHORIZED);
                return;
            }
            const user = await user_service_1.default.getUserProfile(req.user.id);
            if (!user) {
                (0, helpers_1.sendErrorResponse)(res, "User not found", constants_1.HTTP_STATUS.NOT_FOUND);
                return;
            }
            (0, helpers_1.sendSuccessResponse)(res, "Profile retrieved successfully", {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            });
        }
        catch (error) {
            (0, helpers_1.sendErrorResponse)(res, "Failed to get profile", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
    static async updateProfile(req, res, next) {
        try {
            if (!req.user) {
                (0, helpers_1.sendErrorResponse)(res, "User not authenticated", constants_1.HTTP_STATUS.UNAUTHORIZED);
                return;
            }
            const { name, email } = req.body;
            const updateData = {};
            if (name)
                updateData.name = name;
            if (email)
                updateData.email = email;
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    (0, helpers_1.sendErrorResponse)(res, "Please provide a valid email address", constants_1.HTTP_STATUS.BAD_REQUEST);
                    return;
                }
            }
            const user = await user_service_1.default.updateUserProfile(req.user.id, updateData);
            if (!user) {
                (0, helpers_1.sendErrorResponse)(res, "User not found", constants_1.HTTP_STATUS.NOT_FOUND);
                return;
            }
            (0, helpers_1.sendSuccessResponse)(res, "Profile updated successfully", {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            });
        }
        catch (error) {
            if (error.message && error.message.includes("duplicate key")) {
                (0, helpers_1.sendErrorResponse)(res, "Email already exists", constants_1.HTTP_STATUS.CONFLICT);
                return;
            }
            if (error.name === "ValidationError") {
                const messages = Object.values(error.errors).map((err) => err.message);
                (0, helpers_1.sendErrorResponse)(res, messages.join(", "), constants_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            (0, helpers_1.sendErrorResponse)(res, "Failed to update profile", constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.UserController = UserController;
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map