import express from "express";
import type { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";

import { TransactionService } from "./transaction.service";

import { AccountService } from '../account/account.service';




export const transRouter: Router = express.Router();
const transService: TransactionService = new TransactionService();
const accService: AccountService = new AccountService();



// =================> MAKE DEPOSIT <===============
transRouter.post("/deposit",
body("owner_user_id").isString(),
body("amount").isNumeric()
,async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({status: "failed", errors: err.array()});
    }

        try {
        const info = req.body;
        const user = await accService.getUser(info.owner_user_id);
        
        if (!user) return res.status(404).json({status: "failed", info: "No user exist with this ID."});
        const transaction = await transService.deposite(info,user);
        res.status(200).json({status: "success", info: "Deposit successful!"});
        const ttl = user.balance + info.amount;
        await accService.updateBalance(info.owner_user_id,ttl);
    } catch (err: any) {
        return res.status(500).json({status: "failed", info: err});
    }
})



transRouter.get("/checkbalance/:id",async (req: Request, res: Response) => {
    const id: string = req.params.id;
    
    try {

        const user = await accService.getUser(id);
        if (!user) return res.status(404).json({status: "failed", info: "No user exist with this ID."});
        res.status(200).json({status: "success", balance: user.balance});

    } catch (err: any) {
        return res.status(500).json({status: "failed", info: err});
    }
});



transRouter.post("/transferfund",
body("user_id").isString(),
body("transfer_to_id").isString(),
body("amount").isNumeric()
,async (req: Request, res: Response) => {

    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({status: "failed", errors: err.array()});
    }

        try {
        const user_id = req.body.user_id;
        const transfer_to_id = req.body.transfer_to_id;
        const amount = req.body.amount;

        const user = await accService.getUser(user_id);
        const transfer_to = await accService.getUser(transfer_to_id);
        
        if (!user) return res.status(404).json({status: "failed", info: "No user exist with this ID."});
        if (!transfer_to) return res.status(404).json({status: "failed", info: "This transfer To, user does not exist with this ID."});
        const user_balance = user.balance;
        const transfer_to_balance = transfer_to.balance;
        
        

        if (user_balance < amount) return res.status(404).json({status: "failed", info: "Please fund wallet, balance not up to $"+amount+".  Current balance is $"+user_balance});    






        await transService.transferFund({amount,user_id,},transfer_to);
        const user_deduct = user_balance - amount;
        const transfer_to_add = transfer_to_balance + amount;
        await accService.updateBalance(user_id,user_deduct);
        await accService.updateBalance(transfer_to_id,transfer_to_add);
        res.status(200).json({status: "success", info: "Fund Transfered successful!"});
    } catch (err: any) {
        return res.status(500).json({status: "failed", info: err});
    }
})




transRouter.get("/transaction",async (req: Request, res: Response) => {

    try {
        const trans = await transService.getTransactions();
        if (!trans) return res.status(200).json({status: "failed", info: "No Transaction YET."}); 
        return res.status(200).json({status: "success", data: trans});
    } catch (err: any) {
        return res.status(404).json({status: "failed", info: err});
    }
})



transRouter.get("/transaction/:id",async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const trans = await transService.getUserTransaction(id);
        if (!trans) return res.status(200).json({status: "failed", info: "No Transaction exist with this ID."}); 
        return res.status(200).json({status: "success", data: trans});
    } catch (err: any) {
        return res.status(404).json({status: "failed", info: err});
    }
})














