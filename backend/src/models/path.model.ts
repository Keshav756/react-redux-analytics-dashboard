import mongoose, { Document, Schema } from "mongoose";

// Path interface
export interface IPath extends Document {
  title: string;
  description: string;
  category: string;
  steps: mongoose.Types.ObjectId[];
  stepCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Path schema
const pathSchema = new Schema<IPath>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: {
        values: [
          "web-development",
          "mobile-development",
          "data-science",
          "machine-learning",
          "devops",
          "design",
          "marketing",
          "business",
          "other",
        ],
        message:
          "Category must be one of: web-development, mobile-development, data-science, machine-learning, devops, design, marketing, business, other",
      },
    },
    steps: [
      {
        type: Schema.Types.ObjectId,
        ref: "Step",
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete (ret as any)._id;
        delete (ret as any).__v;
        return ret;
      },
    },
  }
);

// Virtual for step count
pathSchema.virtual("stepCount").get(function () {
  return this.steps.length;
});

// Create and export the model
const Path = mongoose.model<IPath>("Path", pathSchema);

export default Path;
