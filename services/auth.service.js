import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const { SECRET_KEY } = process.env;


const generateToken = (user) => {
    const { _id, isBusiness, isAdmin } = user;
    const payloadData = { _id, isBusiness, isAdmin };
    const token = jwt.sign(payloadData, SECRET_KEY, { expiresIn: "7d" });
    return token;
};

const verifyToken = (tokenFromClient) => {
    try {
        const userData = jwt.verify(tokenFromClient, SECRET_KEY);
        return userData;
    } catch (error) {
        return null;
    }
};

export { generateToken, verifyToken };