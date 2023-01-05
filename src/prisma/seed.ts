import { db } from "../utils/db.server";

type Account = {
  email: String;
  firstname: String;
  lastname: String;
  balance: Number;
  password: String;
}

type Transaction = {
  transaction_type: String;
  sender: String;
  recepient: String;
  amount: Number;
}

async function seed() {
    await Promise.all(
        getAccounts().map(acc => {
            return db.account.create({
                data: {
                    email: acc.email,
                    firstname: acc.firstname,
                    lastname: acc.lastname,
                    balance: acc.balance,
                    password: acc.password
                }
            })
        })
    );

    const account = await db.account.findFirst({
        where: {
            firstname: "michael"
        }
    });
}

seed();

function getAccounts(): Array<Account> {
  return [
    {
        email: "ade@gmail.com",
        firstname: "michael",
        lastname: "adewale",
        balance: 20,
        password: "1234"
    },
    {
        email: "new@gmail.com",
        firstname: "bola",
        lastname: "adewale",
        balance: 30,
        password: "1234"
    },
    {
        email: "life@gmail.com",
        firstname: "steven",
        lastname: "adewale",
        balance: 10,
        password: "1234"
    }
  ]
}

function getTransactions(): Array<Transaction> {
    return [
        {
            transaction_type: "savings",
            sender: "michael",
            recepient: "you",
            amount: 100
        },
        {
            transaction_type: "savings",
            sender: "michael",
            recepient: "you",
            amount: 100
        },
        {
            transaction_type: "savings",
            sender: "michael",
            recepient: "you",
            amount: 100
        }
    ]
}