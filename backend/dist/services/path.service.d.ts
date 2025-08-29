import { IPath } from "../models/path.model";
export interface CreatePathData {
    title: string;
    description: string;
    category: string;
}
export interface UpdatePathData {
    title?: string;
    description?: string;
    category?: string;
}
export interface PathFilters {
    category?: string;
    difficulty?: string;
    search?: string;
    aiRelevance?: string;
    userId?: string;
}
export interface PaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export declare class PathService {
    static createPath(pathData: CreatePathData): Promise<IPath>;
    static getAllPaths(category?: string, limit?: number, skip?: number): Promise<IPath[]>;
    static getPathById(id: string): Promise<IPath | null>;
    static updatePath(id: string, updateData: UpdatePathData): Promise<IPath | null>;
    static deletePath(id: string): Promise<void>;
    static getPathsByCategory(category: string): Promise<IPath[]>;
    static searchPaths(filters?: PathFilters, pagination?: PaginationOptions): Promise<{
        paths: IPath[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    static getPathStats(): Promise<{
        totalPaths: number;
        pathsByCategory: Record<string, number>;
    }>;
}
export default PathService;
//# sourceMappingURL=path.service.d.ts.map