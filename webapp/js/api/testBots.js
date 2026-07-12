// ============================================
// TEST BOTS
// ============================================

import { db } from "../services/supabase/supabase.js";



// ============================================
// CREATE TEST USERS
// ============================================


export async function createTestBots(

    latitude,

    longitude

){



    const bots = [


        {


            username:
                "alex_test",


            first_name:
                "Alex",


            age:
                25,


            avatar:
                "",


            bio:
                "Люблю общение",


            activity_type:
                "🍻 Drink",



            latitude:
                latitude + 0.001,


            longitude:
                longitude + 0.001,


            active:
                true,


            active_until:

                new Date(

                    Date.now()

                    +

                    60 * 60000

                ).toISOString()


        },




        {


            username:
                "anna_test",


            first_name:
                "Anna",


            age:
                23,


            avatar:
                "",


            bio:
                "Кофе и разговоры",


            activity_type:
                "☕ Coffee",



            latitude:
                latitude - 0.001,


            longitude:
                longitude + 0.0015,


            active:
                true,


            active_until:

                new Date(

                    Date.now()

                    +

                    90 * 60000

                ).toISOString()


        },





        {


            username:
                "max_test",


            first_name:
                "Max",


            age:
                30,


            avatar:
                "",


            bio:
                "Ищу компанию",


            activity_type:
                "💬 Talk",



            latitude:
                latitude + 0.002,


            longitude:
                longitude - 0.001,


            active:
                true,


            active_until:

                new Date(

                    Date.now()

                    +

                    120 * 60000

                ).toISOString()


        }

    ];





    const {error} = await db()

        .from("users")

        .insert(bots);





    if(error){

        throw error;

    }



    console.log(

        "🤖 Test bots created"

    );


}