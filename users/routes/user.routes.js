import { Router } from "express";
import { hashPassword } from "../../users/services/password.service.js"
import User from "../models/User.Schema.js";
import LoginSchema from "../validation/LoginSchema.js"
import { validate } from "../../middleware/validation.js"
import { getUserById, postNewUser, deleteUser, updateUser } from "../services/usersDataAccess.service.js"
import { comparePassword } from "../services/password.service.js";
import { generateToken } from "../../services/auth.service.js";
import { auth } from "../../middleware/auth.js";
import { isAdmin } from "../../middleware/isAdmin.js"
import lodash from "lodash";
import { isRegistered } from "../../middleware/isRegistered.js";
import { isAdminOrRegistered } from "../../middleware/isAdminOrRegistered.js";

const { pick } = lodash;
const router = Router();

//post: register user
router.post("/", async (req, res) => {
    try {
        const newUser = await postNewUser(req.body);
        newUser.password = await hashPassword(newUser.password);

        await newUser.save();

        return res.json(pick(newUser, ["_id", "name", "image", "isBusiness", "email", "address", "phone"]));

    } catch (err) {
        return res.status(400).send(err.message);
    }
});




//post: login user
router.post("/login", validate(LoginSchema), async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(email, password, user);

        if (!user) {
            return res.status(404).send("User not found");
        }
        const checkPassword = await comparePassword(password, user.password);

        if (!checkPassword) {
            return res.status(401).send("Invalid password");
        }
        const token = generateToken(user);
        return res.send(token);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});


//get: get all users
router.get("/", auth, isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        const newUsers = users.map(user => pick(user, ["_id", "name", "image", "isBusiness", "email", "address", "phone"]));
        return res.json(newUsers);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});




//get: get user
router.get("/:id", auth, isAdminOrRegistered, async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        return res.json(pick(user, ["_id", "name", "image", "isBusiness", "email", "address", "phone"]));
    } catch (err) {
        return res.status(400).send(err.message);
    }
});


//put: edit user
router.put("/:id", auth, isRegistered(false), async (req, res) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        return res.json(pick(user, ["_id", "name", "image", "isBusiness", "email", "address", "phone"]));
    } catch (err) {
        return res.status(400).send(err.message);
    }
})



//patch: change isbusiness status

router.patch('/:id', auth, isRegistered(false), async (req, res) => {
    const { id } = req.params;
    const { isBusiness } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { isBusiness },
            { new: true }
        );

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send((pick(user, ["_id", "name", "image", "isBusiness", "email", "address", "phone"]))
        );
    } catch (error) {
        res.status(500).send('Error updating business status');
    }
});


//delete: delete user
router.delete("/:id", auth, isAdminOrRegistered, async (req, res) => {
    try {
        const userToDelete = await deleteUser(req.params.id);
        return res.json((pick(userToDelete, ["_id", "name", "image", "isBusiness", "email", "address", "phone"]))
        );
    } catch (err) {
        return res.status(400).send(err.message);
    }
});


export default router;
