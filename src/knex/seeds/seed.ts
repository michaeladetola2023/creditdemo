import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
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
    ]);
};
