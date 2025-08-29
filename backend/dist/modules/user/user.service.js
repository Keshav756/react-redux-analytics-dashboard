"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
class UserService {
    static async createUser(userData) {
        try {
            const existingUser = await user_model_1.default.findOne({ email: userData.email });
            if (existingUser) {
                const error = new Error('User with this email already exists');
                error.statusCode = 409;
                throw error;
            }
            const user = new user_model_1.default(userData);
            await user.save();
            return user;
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            const customError = new Error('Failed to create user');
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async findByEmail(email) {
        try {
            return await user_model_1.default.findOne({ email }).select('+password');
        }
        catch (error) {
            const customError = new Error('Failed to find user');
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async findById(id) {
        try {
            return await user_model_1.default.findById(id);
        }
        catch (error) {
            const customError = new Error('Failed to find user');
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async validateCredentials(email, password) {
        try {
            const user = await user_model_1.default.findOne({ email }).select('+password');
            if (!user) {
                const error = new Error('Invalid email or password');
                error.statusCode = 401;
                throw error;
            }
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                const error = new Error('Invalid email or password');
                error.statusCode = 401;
                throw error;
            }
            return user;
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            const customError = new Error('Authentication failed');
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async getUserProfile(userId) {
        try {
            return await user_model_1.default.findById(userId);
        }
        catch (error) {
            const customError = new Error('Failed to get user profile');
            customError.statusCode = 500;
            throw customError;
        }
    }
    static async updateUserProfile(userId, updateData) {
        try {
            const user = await user_model_1.default.findByIdAndUpdate(userId, { ...updateData, updatedAt: new Date() }, { new: true, runValidators: true });
            if (!user) {
                const error = new Error('User not found');
                error.statusCode = 404;
                throw error;
            }
            return user;
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            const customError = new Error('Failed to update user profile');
            customError.statusCode = 500;
            throw customError;
        }
    }
}
exports.UserService = UserService;
exports.default = UserService;
//# sourceMappingURL=user.service.js.map