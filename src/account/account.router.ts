import express from "express";
import type { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";

import { AccountService } from "./account.service";
import { TransactionService } from "../transaction/transaction.service";


export const walletRouter: Router = express.Router();
const accService: AccountService = new AccountService();
const transService: TransactionService = new TransactionService();

// =================> GET LIST OF ALL USERS <===============
walletRouter.get("/wallet",async (req: Request, res: Response) => {

    try {
        const users = await accService.getUsers();
        if (!users) return res.status(200).json({status: "failed", info: "No user YET."}); 
        return res.status(200).json({status: "success", data: users});
    } catch (err: any) {
        return res.status(404).json({status: "failed", info: err});
    }

});



// =================> GET SINGLE WALLET <===============
walletRouter.get("/wallet/:id",async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const user = await accService.getUser(id);
        if (!user) return res.status(404).json({status: "failed", info: "No user exist with this ID."}); 
        return res.status(200).json({status: "success", data: user});
    } catch (err: any) {
        return res.status(500).json({status: "failed", info: err});
    }

});


// =================> CREATE NEW WALLET <===============
walletRouter.post("/wallet",
body("email").isString(),
body("firstname").isString(),
body("lastname").isString(),
body("password").isString()
,async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({status: "failed", errors: err.array()});
    }

        try {
        const info = req.body;
        const user = await accService.createUser(info);
        return res.status(200).json({status: "success", info: "Account successfully created."});
    } catch (err: any) {
        return res.status(500).json({status: "failed", info: err});
    }
})






walletRouter.post("/withdraw/:id",
body("user_id").isString(),
body("amount").isNumeric()
,async (req: Request, res: Response) => {

    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({status: "failed", errors: err.array()});
    }

        try {
        const user_id = req.body.user_id;
        const amount = req.body.amount;

        const user = await accService.getUser(user_id);
        
        
        if (!user) return res.status(404).json({status: "failed", info: "No user exist with this ID."});
        const user_balance = user.balance;
        
        
        

        if (user_balance < amount) return res.status(404).json({status: "failed", info: "Please fund wallet, You can'/t withdraw up to $"+amount+".  Current balance is $"+user_balance});    





        const user_deduct = user_balance - amount;
        await transService.withdraw({amount,user_id,firstname: user.firstname,lastname: user.lastname});
        await accService.updateBalance(user_id,user_deduct);
        res.status(200).json({status: "success", info: "Fund withdrawed successful!"});
    } catch (err: any) {
        return res.status(500).json({status: "failed", info: err});
    }
})









