import { AppError } from "../utils/AppError.js";

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            return next(
                new AppError(
                    403,
                    `Role (${req.user?.role}) is not allowed to access this resource`
                )
            );
        }
        next();
    };
};
