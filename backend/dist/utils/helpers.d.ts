import { Response } from 'express';
export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    timestamp: string;
}
export declare const sendSuccessResponse: <T>(res: Response, message: string, data?: T, statusCode?: number) => Response;
export declare const sendErrorResponse: (res: Response, message: string, statusCode?: number, error?: string) => Response;
export declare const asyncHandler: (fn: Function) => (req: any, res: any, next: any) => Promise<any>;
export interface PaginationOptions {
    page?: number;
    limit?: number;
}
export interface PaginationResult {
    page: number;
    limit: number;
    skip: number;
    totalPages?: number;
    totalItems?: number;
}
export declare const getPaginationParams: (options: PaginationOptions) => PaginationResult;
export declare const isValidEmail: (email: string) => boolean;
export declare const isValidPassword: (password: string) => boolean;
export declare const capitalizeFirst: (str: string) => string;
export declare const generateSlug: (text: string) => string;
export declare const formatDate: (date: Date) => string;
export declare const addDays: (date: Date, days: number) => Date;
export declare const removeUndefined: (obj: Record<string, any>) => Record<string, any>;
export declare const pick: <T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]) => Pick<T, K>;
export interface JwtPayload {
    userId: string;
    email: string;
    iat?: number;
    exp?: number;
}
export declare const generateToken: (userId: string, email: string) => string;
//# sourceMappingURL=helpers.d.ts.map