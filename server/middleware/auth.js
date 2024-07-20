import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";


export const isAuthorized = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (error) {
            res.status(401).json({ message: "Unauthorized, invalid token" });
        }
    } else {
        res.status(401).json({ message: "Unauthenticated, no token provided" });
    }
});