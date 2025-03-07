import { Router } from "express";
import { getCardsByUserId, deleteCard, postNewCard, getCardById, updateCard, updateLikesCard } from "../services/cardsDataAccess.service.js"
import { auth } from "../../middleware/auth.js";
import { isBusiness } from "../../middleware/isBusiness.js"
import Card from "../models/Card.Schema.js";
import { isRegistered } from "../../middleware/isRegistered.js";
import { isAdminOrRegistered } from "../../middleware/isAdminOrRegistered.js";

const router = Router();

//// get all cards 
router.get("/", async (req, res) => {
    try {
        const cards = await Card.find();
        return res.json(cards);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

//// get all users cards by user id from token
router.get("/my-cards", auth, isBusiness, async (req, res) => {
    try {
        const card = await getCardsByUserId(req.user._id);
        return res.json(card);
    } catch (err) {
        return res.status(400).send(err.message);
    }
});


////get one card by id card
router.get("/:id", async (req, res) => {
    try {
        const card = await getCardById(req.params.id);
        return res.json(card);
    } catch (err) {
        return res.status(400).send(err.message);
    }
});


//create a new card

router.post("/", auth, isBusiness, async (req, res) => {
    try {
        const newCard = await postNewCard(req.body);
        newCard.userId = req.user._id;
        await newCard.save();

        return res.json(newCard);
    } catch (err) {
        return res.status(400).send(err.message);
    }
});

// edit card by the user who created the card
router.put("/:id", auth, isRegistered(true), async (req, res) => {
    try {
        const card = await updateCard(req.params.id, req.body);

        return res.json(card);
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
});

// update likes array
router.patch("/:id", auth, async (req, res) => {
    try {
        let likesArr = await updateLikesCard(req.params.id, req.user._id);
        return res.json(likesArr);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

//delete card
router.delete("/:id", auth, isAdminOrRegistered, async (req, res) => {
    try {

        const cardToDelete = await deleteCard(req.user._id, req.params.id);
        return res.json(cardToDelete);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})



export default router;
