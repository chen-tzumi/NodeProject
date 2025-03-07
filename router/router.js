import { Router } from "express";
import UserRouter from "../users/routes/user.routes.js"
import CardRouter from "../cards/routes/card.routes.js"
const router = Router();

router.use("/users", UserRouter);
router.use("/cards", CardRouter);

export default router;
