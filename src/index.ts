import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { walletRouter } from "./account/account.router";
import { transRouter } from "./transaction/transaction.router";

dotenv.config();
const port: number = parseInt(process.env.SERVER_PORT as string) || 7000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api",walletRouter);
app.use("/api",transRouter);



app.listen(port,() => {
    console.log(`App listening to port ${port}`);
});