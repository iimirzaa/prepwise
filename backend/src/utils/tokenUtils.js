import jwt from 'jsonwebtoken';
export const generateAccessToken = (paylaod) => {
    return jwt.sign(
        paylaod,
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '15m', issuer: "prepwise", audience: "prepwise-mobile-app" }

    );
}
export const generateRefreshToken = async (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d", issuer: "prepwise", audience: "prepwise-mobile-app" }
    )
}
export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET,
            {
                issuer: "quizora-api",
                audience: "quizora-app"
            }
        );
    } catch (error) {

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Access token expired"
            });
        }

        return res.status(401).json({
            message: "Invalid token"
        });
    }

};
export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET,
            {
                issuer: "quizora-api",
                audience: "quizora-app"
            }
        );
    } catch (error) {

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Access token expired"
            });
        }

        return res.status(401).json({
            message: "Invalid token"
        });
    }

};