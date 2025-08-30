"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const stepSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Step title is required"],
        trim: true,
        minlength: [2, "Step title must be at least 2 characters long"],
        maxlength: [100, "Step title cannot exceed 100 characters"],
    },
    description: {
        type: String,
        required: [true, "Step description is required"],
        trim: true,
        minlength: [10, "Step description must be at least 10 characters long"],
        maxlength: [1000, "Step description cannot exceed 1000 characters"],
    },
    resourceLinks: [
        {
            type: String,
            trim: true,
            validate: {
                validator: function (v) {
                    const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
                    return !v || urlRegex.test(v);
                },
                message: "Resource link must be a valid URL",
            },
        },
    ],
    completedBy: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    order: {
        type: Number,
        required: [true, "Step order is required"],
        min: [1, "Step order must be at least 1"],
    },
    pathId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Path",
        required: [true, "PathId reference is required"],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
});
stepSchema.virtual("completionCount").get(function () {
    return this.completedBy.length;
});
stepSchema.index({ pathId: 1, order: 1 }, { unique: true });
const Step = mongoose_1.default.model("Step", stepSchema);
exports.default = Step;
//# sourceMappingURL=step.model.js.map