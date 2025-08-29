import { IStep } from "../models/step.model";
export interface CreateStepData {
    name: string;
    description: string;
    resourceLinks?: string[];
    order: number;
    path: string;
}
export interface UpdateStepData {
    name?: string;
    description?: string;
    resourceLinks?: string[];
    order?: number;
}
export declare class StepService {
    static addStepToPath(stepData: CreateStepData): Promise<IStep>;
    static getStepById(id: string): Promise<IStep | null>;
    static updateStep(id: string, updateData: UpdateStepData): Promise<IStep | null>;
    static deleteStep(id: string): Promise<void>;
    static markStepCompletedByUser(stepId: string, userId: string): Promise<IStep | null>;
    static markStepIncompleteByUser(stepId: string, userId: string): Promise<IStep | null>;
    static getStepsByPath(pathId: string): Promise<IStep[]>;
    static getAllStepsForDebug(): Promise<IStep[]>;
    static getUserCompletedSteps(userId: string): Promise<IStep[]>;
    static getUserProgress(userId: string, pathId: string): Promise<{
        pathId: string;
        totalSteps: number;
        completedSteps: string[];
        completionRate: number;
        completedCount: number;
        remainingSteps: Array<{
            id: string;
            name: string;
            order: number;
            description: string;
        }>;
    }>;
    static getStepCompletionStats(stepId: string): Promise<{
        totalCompletions: number;
        completedBy: Array<{
            id: string;
            name: string;
            email: string;
        }>;
    }>;
}
export default StepService;
//# sourceMappingURL=step.service.d.ts.map