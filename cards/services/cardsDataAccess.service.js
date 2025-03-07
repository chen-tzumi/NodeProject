import Lodash from "lodash";
import Card from "../models/Card.Schema.js";

const { pick } = Lodash;


const getCardsByUserId = async (userId) => {
    try {
        const cards = await Card.find({ userId });

        if (!cards || cards.length === 0) {
            throw new Error("Card not found");
        }
        const returnCards = cards.map(card => pick(card, ["name", "image", "_id", "isBusiness", "email", "address"]));
        return returnCards;
    } catch (err) {
        throw new Error(err.message);
    }
};


const getCardById = async (cardId) => {
    try {
        const card = await Card.findById(cardId);

        if (!card) {
            throw new Error("Card not found");
        }
        const returnCard = pick(card, ["name", "image", "_id", "isBusiness", "email", "address"]);
        return returnCard;

    } catch (err) {
        throw new Error(err.message);
    }
};



const postNewCard = async (bodyC) => {
    try {
        const newCard = new Card(bodyC);
        await newCard.save();

        if (!newCard) {
            throw new Error("the user is invalid");
        }
        return newCard;
    } catch (err) {
        throw new Error(err.message);
    }
};


const updateCard = async (cardId, details) => {
    try {

        const card = await Card.findById(cardId);
        if (!card) {
            throw new Error("Card not found");
        }

        const cardNewDetails = await Card.findByIdAndUpdate(
            cardId,
            { $set: details },
            { new: true, runValidators: true }
        );
        if (!cardNewDetails) {
            throw new Error("Failed to update card");

        }
        return cardNewDetails;
    } catch (err) {
        throw new Error(err.message);
    }
};



const updateLikesCard = async (cardId, userId) => {
    try {
        const card = await Card.findById(cardId);
        if (!card) {
            throw new Error("the id is not found");
        }
        if (card.likes.includes(userId)) {
            card.likes = card.likes.filter(id => id.toString() !== userId.toString());
        }
        else {
            card.likes.push(userId);
        }
        await card.save();

        return card;

    } catch (err) {
        throw new Error(err.message);
    }
};

const deleteCard = async (userId, cardId) => {
    try {

        const card = await Card.findById(cardId);
        if (!card) {
            throw new Error("Card not found");
        }

        const cardToDelete = Card.findByIdAndDelete(cardId);
        if (!cardToDelete) {
            throw new Error("the Id is not found");
        }
        return cardToDelete;
    } catch (err) {
        throw new Error(err.message);
    }
};



export { getCardsByUserId, deleteCard, postNewCard, getCardById, updateCard, updateLikesCard };