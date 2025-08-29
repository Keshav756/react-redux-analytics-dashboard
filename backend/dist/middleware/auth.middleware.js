"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("../services/user.service"));
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.substring(7)
            : null;
        if (!token) {
            const error = new Error('Access denied. No token provided.');
            error.statusCode = 401;
            return next(error);
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            const error = new Error('JWT_SECRET is not configured');
            error.statusCode = 500;
            return next(error);
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        const user = await user_service_1.default.findById(decoded.userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 401;
            return next(error);
        }
        req.user = {
            id: user._id.toString(),
            name: user.name,
            email: user.email
        };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            const customError = new Error('Invalid token');
            customError.statusCode = 401;
            return next(customError);
        }
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            const customError = new Error('Token expired');
            customError.statusCode = 401;
            return next(customError);
        }
        const customError = new Error('Authentication failed');
        customError.statusCode = 500;
        next(customError);
    }
};
exports.authenticate = authenticate;
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.substring(7)
            : null;
        if (token) {
            const jwtSecret = process.env.JWT_SECRET;
            if (jwtSecret) {
                const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
                const user = await user_service_1.default.findById(decoded.userId);
                if (user) {
                    req.user = {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email
                    };
                }
            }
        }
        next();
    }
    catch (error) {
        next();
    }
};
exports.optionalAuth = optionalAuth;
exports.default = exports.authenticate;
//# sourceMappingURL=auth.middleware.js.map