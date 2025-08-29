import { Request, Response, NextFunction } from "express";
export declare class AIController {
    static generateSuggestions(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getLearningAnalytics(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getRecommendations(req: Request, res: Response, next: NextFunction): Promise<void>;
    static generateStudyPlan(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default AIController;
//# sourceMappingURL=ai.controller.d.ts.map