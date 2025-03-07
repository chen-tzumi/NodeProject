

export const isAdminOrRegistered = (req, res, next) => {
    if (req.user._id !== req.params.id && !req.user.isAdmin) {
        return res.status(403).json({
            message: "Authentication Error: you are not the admin or the registered user!!!!"
        });
    }
    return next();
};
