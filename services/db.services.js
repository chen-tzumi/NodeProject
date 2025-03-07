import dotenv from "dotenv";
import { connect } from "mongoose";
import chalk from "chalk";

dotenv.config();
const db = process.env.ENV === "dev" ? process.env.MONGO_LOCAL : process.env.MONGO_ATLAS
const name = db === process.env.MONGO_LOCAL ? "local" : "atlas"
export const connectToDb = async () => {

    try {
        await connect(db);
        console.log(chalk.magenta("connected to mongodb " + name));
    } catch (err) {
        console.log(err);
    }
}