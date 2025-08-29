export declare const HTTP_STATUS: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly NO_CONTENT: 204;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly UNPROCESSABLE_ENTITY: 422;
    readonly INTERNAL_SERVER_ERROR: 500;
    readonly SERVICE_UNAVAILABLE: 503;
};
export declare const MESSAGES: {
    readonly SUCCESS: "Operation completed successfully";
    readonly CREATED: "Resource created successfully";
    readonly UPDATED: "Resource updated successfully";
    readonly DELETED: "Resource deleted successfully";
    readonly NOT_FOUND: "Resource not found";
    readonly UNAUTHORIZED: "Unauthorized access";
    readonly FORBIDDEN: "Access forbidden";
    readonly VALIDATION_ERROR: "Validation error";
    readonly SERVER_ERROR: "Internal server error";
    readonly DATABASE_ERROR: "Database operation failed";
};
export declare const COLLECTIONS: {
    readonly USERS: "users";
    readonly ROADMAPS: "roadmaps";
    readonly SKILLS: "skills";
    readonly CATEGORIES: "categories";
};
export declare const ENV: {
    readonly DEVELOPMENT: "development";
    readonly PRODUCTION: "production";
    readonly TEST: "test";
};
export declare const VALIDATION: {
    readonly PASSWORD_MIN_LENGTH: 8;
    readonly USERNAME_MIN_LENGTH: 3;
    readonly USERNAME_MAX_LENGTH: 30;
    readonly EMAIL_REGEX: RegExp;
    readonly PHONE_REGEX: RegExp;
};
export declare const PAGINATION: {
    readonly DEFAULT_PAGE: 1;
    readonly DEFAULT_LIMIT: 10;
    readonly MAX_LIMIT: 100;
};
//# sourceMappingURL=constants.d.ts.map