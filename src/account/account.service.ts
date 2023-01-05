//import { db } from "../utils/db.server";
import * as argon from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import db from "../utils/knex.db.server";
import { accountDto } from "./dto/account.dto";


export class AccountService {

    getUser(id: string): Promise <accountDto | null> {
        return db().select('user_id','email','firstname','lastname','created_at','updated_at','balance','trans_id').from('users').where('user_id',id).first();
        
    }

    getUsers(): Promise<accountDto[] | null> {
        return db().select('user_id','email','firstname','lastname','created_at','updated_at','balance','trans_id').from('users');       
        
    }

    async createUser(user: accountDto) {

        const {email,firstname,lastname,password} = user;
        const hash = await argon.hash(password);
        const user_id = uuidv4();
        const balance = 0.00;

        return await db('users').insert({
            user_id,
            email,
            firstname,
            lastname,
            balance,
            password: hash
        });
    }

    updateBalance(user_id: string,amount: any): Promise <accountDto | null> {
        console.log({user_id,amount,});
        console.log(amount);
        console.log(typeof amount);
        return db('users').where({
            user_id,
        }).update({
            balance: amount+.0
        });
    }

    async deleteUser(id: number) {
        await db('users').where({id,}).del();
        
    }
}