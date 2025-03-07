import usersSeed from "../users/initialData/initialUser.json" with {type: "json"};
import cardSeed from "../cards/initialData/initialCard.json" with {type: "json"};
import Card from "../cards/models/Card.Schema.js"
import User from "../users/models/User.Schema.js";
import { hashPassword } from "../users/services/password.service.js";

export const createInitialData = async () => {
    const usersFromDb = await User.find();

    try {
        usersSeed.forEach(async (user) => {
            if (usersFromDb.find((dbUser) => dbUser.email === user.email)) {
                return;
            }
            const newUser = new User(user);
            newUser.password = await hashPassword(newUser.password);
            await newUser.save();
        });
        const cardsLength = await Card.find().countDocuments();

        if (cardsLength > 3) {
            return;
        }

        cardSeed.forEach(async (card) => {
            const newCard = new Card(card);
            await newCard.save();
        });

    } catch (err) {
        console.log(err);
    }

}