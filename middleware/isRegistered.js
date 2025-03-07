import Card from "../cards/models/Card.Schema.js";


export const isRegistered = (isCard) => async (req, res, next) => {
    const card = await Card.findById(req.params.id);
    if (isCard && !card) {
        return res.status(404).json({
            message: "card not found"
        });
    }
    if (isCard && req.user._id.toString() !== card.userId.toString()) {
        return res.status(403).json({
            message: "Authentication Error: you are not the creator user!!!!"
        })
    }
    if (!isCard && req.user._id.toString() !== req.params.id.toString()) {
        return res.status(403).json({
            message: "Authentication Error: you are not the registered user!!!!"
        });
    }
    return next();
};