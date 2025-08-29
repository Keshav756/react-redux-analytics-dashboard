import { Request, Response, NextFunction } from "express";
export declare class StepController {
    static addStepToPath(req: Request, res: Response, next: NextFunction): Promise<void>;
    static updateStep(req: Request, res: Response, next: NextFunction): Promise<void>;
    static deleteStep(req: Request, res: Response, next: NextFunction): Promise<void>;
    static markStepCompleted(req: Request, res: Response, next: NextFunction): Promise<void>;
    static markStepIncomplete(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getStepsByPath(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getAllStepsDebug(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getUserCompletedSteps(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getUserProgress(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getStepCompletionStats(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default StepController;
//# sourceMappingURL=step.controller.d.ts.map