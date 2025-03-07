import { Schema, model } from "mongoose";

const cardSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        url: {
            type: String,
            required: false,
            default: "https://pickture.co.il/wp-content/uploads/2023/01/pickture-11.jpg"
        },
        alt: {
            type: String,
            required: false,
        },
    },
    web: {
        type: String,
        required: true
    },
    address: {
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        houseNumber: {
            type: Number,
            required: true,
        },
        zip: {
            type: String,
            required: false,
        }
    },
    bizNumber: {
        type: Number,
        required: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    likes: {
        type: [Schema.Types.ObjectId],
        ref: "user",
        required: false
    }
});


const Card = model("Card", cardSchema);
export default Card;




