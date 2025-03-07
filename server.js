import express from "express";
import router from "./router/router.js";
import cors from "cors";
import { badRequest404 } from "./middleware/badRequest404.js";
import { badRequest500 } from "./middleware/badRequest500.js";
import { morganLogger } from "./middleware/logger.js";
import { PORT } from "./services/env.service.js";
import { connectToDb } from "./services/db.services.js"
import { createInitialData } from "./services/initialData.service.js"

const app = express();

app.use(morganLogger);
app.use(cors());

app.use(express.json({ limit: "5mb" }));
app.use(express.static("public"));


app.use(router);

app.use(badRequest404)



app.use(badRequest500)



app.listen(PORT, async () => {
    console.log(`server is running on ${PORT}`);
    await connectToDb();
    await createInitialData();
})




