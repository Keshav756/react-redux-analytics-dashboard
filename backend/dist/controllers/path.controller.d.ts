import { Request, Response, NextFunction } from "express";
export declare class PathController {
    static createPath(req: Request, res: Response, next: NextFunction): Promise<void>;
    static searchPaths(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getPathById(req: Request, res: Response, next: NextFunction): Promise<void>;
    static updatePath(req: Request, res: Response, next: NextFunction): Promise<void>;
    static deletePath(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getPathsByCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getPathStats(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default PathController;
//# sourceMappingURL=path.controller.d.ts.map