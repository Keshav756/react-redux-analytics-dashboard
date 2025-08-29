import { Request, Response, NextFunction } from "express";
export declare class UserController {
    static register(req: Request, res: Response, next: NextFunction): Promise<void>;
    static login(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
    static updateProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default UserController;
//# sourceMappingURL=user.controller.d.ts.map