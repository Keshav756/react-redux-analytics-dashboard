import { IUser } from '../models/user.model';
export interface CreateUserData {
    name: string;
    email: string;
    password: string;
}
export interface LoginData {
    email: string;
    password: string;
}
export interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
        createdAt: Date;
    };
    token: string;
}
export declare class UserService {
    static createUser(userData: CreateUserData): Promise<IUser>;
    static findByEmail(email: string): Promise<IUser | null>;
    static findById(id: string): Promise<IUser | null>;
    static validateCredentials(email: string, password: string): Promise<IUser>;
    static getUserProfile(userId: string): Promise<IUser | null>;
    static updateUserProfile(userId: string, updateData: Partial<CreateUserData>): Promise<IUser | null>;
}
export default UserService;
//# sourceMappingURL=user.service.d.ts.map