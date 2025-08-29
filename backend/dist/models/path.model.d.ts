import mongoose, { Document } from "mongoose";
export interface IPath extends Document {
    title: string;
    description: string;
    category: string;
    steps: mongoose.Types.ObjectId[];
    stepCount?: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const Path: mongoose.Model<IPath, {}, {}, {}, mongoose.Document<unknown, {}, IPath, {}, {}> & IPath & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Path;
//# sourceMappingURL=path.model.d.ts.map