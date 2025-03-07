

export const isBusiness = (req, res, next) => {
    if (!req.user.isBusiness) {
        return res.status(403).json({
            message: "Authentication Error: you are not a business user!!!!"
        });
    }
    return next();
};