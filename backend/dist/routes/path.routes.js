"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_controller_1 = __importDefault(require("../controllers/path.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", path_controller_1.default.searchPaths);
router.get("/category/:category", path_controller_1.default.getPathsByCategory);
router.get("/stats", path_controller_1.default.getPathStats);
router.post("/", auth_middleware_1.authenticate, path_controller_1.default.createPath);
router.get("/:id", path_controller_1.default.getPathById);
router.put("/:id", auth_middleware_1.authenticate, path_controller_1.default.updatePath);
router.delete("/:id", auth_middleware_1.authenticate, path_controller_1.default.deletePath);
exports.default = router;
//# sourceMappingURL=path.routes.js.map