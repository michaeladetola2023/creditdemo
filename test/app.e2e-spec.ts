import * as pactum from 'pactum';
import { accountDto } from "../src/account/dto/account.dto"




describe('Server e2e testing', () => {

    describe('wallet', ()=> {
        const balance = 0;
        const dto: accountDto = {
          email: "michael@gmail.com",
          firstname: 'bimpe',
          lastname: 'olawale',
          password: "1234",
          balance
        }

        const withdrawDto = {
            user_id: "b74b8f17-5b28-4c99-9946-f97795929f10",
            amount: 10
        }

        describe('createwallet', ()=> {
          
          //create wallet
          it('should create new Wallet', () => {
            pactum.spec().post("http://localhost:7000/api/wallet").withBody(dto).expectStatus(200);//if u want 2 see wat z inside d request respond ADD .inspect() at d END.
          }); 
          
          // throw error if all deatails not included
          it('should THROW error if wallet EMAIL is not included', () => {
            pactum.spec().post("http://localhost:7000/api/wallet").withBody({
                firstname: dto.firstname,
                larstname: dto.lastname,
                password: dto.password,
                balance: dto.balance
            }).expectStatus(400);//if u want 2 see wat z inside d request respond ADD .inspect() at d END.
          }); 

          
          // throw error if all deatails not included
          it('should THROW error if wallet PASSWORD is not included', () => {
            pactum.spec().post("http://localhost:7000/api/wallet").withBody({
                firstname: dto.firstname,
                larstname: dto.lastname,
                email: dto.email,
                balance: dto.balance
            }).expectStatus(400);//if u want 2 see wat z inside d request respond ADD .inspect() at d END.
          });   
          
          
          //withdraw from wallet
          it('should withdraw funds from Wallet',async () => {
            pactum.spec().post("http://localhost:7000/api/wallet").withBody(withdrawDto).expectStatus(200);//if u want 2 see wat z inside d request respond ADD .inspect() at d END.
          }); 
       
    
        });




        describe("listWallet",() => {

            //get all wallet
          it('should list all Wallet accounts available',async () => {
            pactum.spec().get("http://localhost:7000/api/wallet").expectStatus(200);//if u want 2 see wat z inside d request respond ADD .inspect() at d END.
          });    
          

          //get a user wallet by id
          it('should get a particular user wallet',async () => {
            pactum.spec().get("http://localhost:7000/api/wallet/b74b8f17-5b28-4c99-9946-f97795929f10").expectStatus(200).inspect();//if u want 2 see wat z inside d request respond ADD .inspect() at d END.
          });  
        });
    
        
    });


    describe('transaction', () => {
        

        //fund wallet
        describe("deposit",() => {

            it('should make deposite of funds into Wallet',async () => {
                pactum.spec().post("http://localhost:7000/api/deposit").withBody({owner_user_id: "b74b8f17-5b28-4c99-9946-f97795929f10",amount: 300}).expectStatus(200);//if u want 2 see wat z inside d request respond ADD .inspect() at d END.
            });
        });
        

        //check balance
        describe("balance",() => {

            it('should check user wallet balance',async () => {  
                pactum.spec().get("http://localhost:7000/api/checkbalance/b74b8f17-5b28-4c99-9946-f97795929f10").expectStatus(200);//if u want 2 see wat z inside d request respond ADD .inspect() at d END.
            });
        });
        

        // all transaction
        describe("listTransactions",() => {

            it('should list all wallet transaction',async () => {  
                pactum.spec().get("http://localhost:7000/api/transaction").expectStatus(200);//if u want 2 see wat z inside d request respond ADD .inspect() at d END.
            });


            it('should list sigle wallet transaction',async () => {  
                pactum.spec().get("http://localhost:7000/api/transaction/5b983a15-0f14-4e58-8110-823e6a138a87").expectStatus(200);//if u want 2 see wat z inside d request respond ADD .inspect() at d END.
            });
        });

        
        //
        describe("transferFund",() => {

            it('should transfer fund from to other user',async () => {
                pactum.spec().post("http://localhost:7000/api/transferfund").withBody({user_id: "b74b8f17-5b28-4c99-9946-f97795929f10",transfer_to_id: "5b983a15-0f14-4e58-8110-823e6a138a87",amount: 300}).expectStatus(200);//if u want 2 see wat z inside d request respond ADD .inspect() at d END.
            });


            it('should THROW ERROR when sendTo ID invalid.',async () => {
                pactum.spec().post("http://localhost:7000/api/transferfund").withBody({user_id: "b74b8f17-5b28-4c99-9946-f97795929f10",transfer_to_id: "no such id",amount: 300}).expectStatus(400);//if u want 2 see wat z inside d request respond ADD .inspect() at d END.
            });
        });

    });
})





















