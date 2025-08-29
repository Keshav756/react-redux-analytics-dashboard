"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/register", user_controller_1.default.register);
router.post("/login", user_controller_1.default.login);
router.get("/profile", auth_middleware_1.authenticate, user_controller_1.default.getProfile);
router.put("/profile", auth_middleware_1.authenticate, user_controller_1.default.updateProfile);
exports.default = router;
//# sourceMappingURL=user.routes.js.map