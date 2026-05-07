import bcryptjs from "bcryptjs";
export const hashPassword = async (password) => {
    return bcryptjs.hash(password, 10);
};
export const comparePasswords = async (password, hashedPassword) => {
    return bcryptjs.compare(password, hashedPassword);
};
//# sourceMappingURL=password.js.map