//import { db } from "../utils/db.server";
import { v4 as uuidv4 } from 'uuid';
import db from "../utils/knex.db.server";
import { depositDto } from "./dto/transaction.dto";




export class TransactionService {

    deposite(dto: depositDto,user: any): Promise<depositDto> {

        const trans_id = uuidv4();
        const transaction_type = "deposit";
        const sender = dto.owner_user_id;
        const recepient = user.firstname +" "+ user.lastname;
        
        return db('transaction').insert({
            ...dto,
            trans_id,
            transaction_type,
            sender,
            recepient
        });
        
    }

    getUserTransaction(id: string):Promise<depositDto[] | null> {
        return db().select().from('transaction').where('owner_user_id',id);
    }

    getTransactions(): Promise<depositDto[]> {
        return db().select('*').from('transaction');       
        
    }


    transferFund(dto: any,user: any): Promise<depositDto> {

        const trans_id = uuidv4();
        const transaction_type = "fundTransfer";
        const sender = dto.user_id;
        const recepient = user.firstname +" "+ user.lastname;
        
        return db('transaction').insert({
            amount: dto.amount,
            owner_user_id: dto.user_id,
            trans_id,
            transaction_type,
            sender,
            recepient
        });
    }


    withdraw(dto: any): Promise<depositDto> {

        const trans_id = uuidv4();
        const transaction_type = "withdraw";
        const sender = dto.user_id;
        const recepient = dto.firstname +" "+ dto.lastname;
        
        return db('transaction').insert({
            amount: dto.amount,
            owner_user_id: dto.user_id,
            trans_id,
            transaction_type,
            sender,
            recepient
        });
    }

    
}