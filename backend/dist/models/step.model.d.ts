import mongoose, { Document } from "mongoose";
export interface IStep extends Document {
    name: string;
    description: string;
    resourceLinks: string[];
    completedBy: mongoose.Types.ObjectId[];
    order: number;
    path: mongoose.Types.ObjectId;
    completionCount?: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const Step: mongoose.Model<IStep, {}, {}, {}, mongoose.Document<unknown, {}, IStep, {}, {}> & IStep & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Step;
//# sourceMappingURL=step.model.d.ts.map