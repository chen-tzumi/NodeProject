import User from "../models/User.Schema.js";
import Lodash from "lodash";
const { pick } = Lodash;

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
};


const postNewUser = async (bodyU) => {
    try {
        const newUser = new User(bodyU);
        await newUser.save();

        if (!newUser) {
            throw new Error("the user is invalid");
        }
        return newUser;
    } catch (err) {
        throw new Error(err.message);
    }
};


const deleteUser = async (userId) => {
    try {
        const userToDelete = User.findByIdAndDelete(userId);
        if (!userToDelete) {
            throw new Error("the id is not found");
        }
        return userToDelete;
    } catch (err) {
        throw new Error(err.message);
    }
};


const updateUser = async (userId, details) => {
    try {

        const userNewDetails = await User.findByIdAndUpdate(userId, details);
        if (!userNewDetails) {
            throw new Error("the id is not found");
        }
        const updateUser = await User.findById(userId);;
        return updateUser;
    } catch (err) {
        throw new Error(err.message);
    }
};


export { getUserById, postNewUser, deleteUser, updateUser };