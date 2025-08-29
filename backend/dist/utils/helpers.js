"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.pick = exports.removeUndefined = exports.addDays = exports.formatDate = exports.generateSlug = exports.capitalizeFirst = exports.isValidPassword = exports.isValidEmail = exports.getPaginationParams = exports.asyncHandler = exports.sendErrorResponse = exports.sendSuccessResponse = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("./constants");
const sendSuccessResponse = (res, message, data, statusCode = constants_1.HTTP_STATUS.OK) => {
    const response = {
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    };
    return res.status(statusCode).json(response);
};
exports.sendSuccessResponse = sendSuccessResponse;
const sendErrorResponse = (res, message, statusCode = constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, error) => {
    const response = {
        success: false,
        message,
        error,
        timestamp: new Date().toISOString()
    };
    return res.status(statusCode).json(response);
};
exports.sendErrorResponse = sendErrorResponse;
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.asyncHandler = asyncHandler;
const getPaginationParams = (options) => {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(100, Math.max(1, options.limit || 10));
    const skip = (page - 1) * limit;
    return {
        page,
        limit,
        skip
    };
};
exports.getPaginationParams = getPaginationParams;
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
const isValidPassword = (password) => {
    return password.length >= 8;
};
exports.isValidPassword = isValidPassword;
const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
exports.capitalizeFirst = capitalizeFirst;
const generateSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};
exports.generateSlug = generateSlug;
const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};
exports.formatDate = formatDate;
const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
exports.addDays = addDays;
const removeUndefined = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined));
};
exports.removeUndefined = removeUndefined;
const pick = (obj, keys) => {
    const result = {};
    keys.forEach(key => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
};
exports.pick = pick;
const generateToken = (userId, email) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const payload = {
        userId,
        email
    };
    const options = {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    };
    return jsonwebtoken_1.default.sign(payload, jwtSecret, options);
};
exports.generateToken = generateToken;
//# sourceMappingURL=helpers.js.map