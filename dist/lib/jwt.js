import jwt from "jsonwebtoken";
import { env } from "../config/env";
export const generateAccessToken = (userId, role) => {
    const options = { expiresIn: env.JWT_ACCESS_EXPIRES_IN };
    return jwt.sign({ userId, role }, env.JWT_ACCESS_SECRET, options);
};
export const generateRefreshToken = (userId) => {
    const options = { expiresIn: env.JWT_REFRESH_EXPIRES_IN };
    return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, options);
};
export const verifyAccessToken = (token) => {
    return jwt.verify(token, env.JWT_ACCESS_SECRET);
};
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, env.JWT_REFRESH_SECRET);
};
//# sourceMappingURL=jwt.js.map