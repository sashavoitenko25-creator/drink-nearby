// ============================================
// NEARBY USERS API
// ============================================

import { db } from "../services/supabase/supabase.js";

import {
    getState
} from "../core/state.js";

import {
    calculateDistance
} from "../services/location/distance.js";



// ============================================
// GET ACTIVE USERS
// ============================================

export async function getNearbyUsers() {


    const { data, error } = await db()

        .from("users")

        .select(`
            id,
            username,
            first_name,
            last_name,
            avatar,
            age,
            bio,
            activity_type,
            active_until,
            latitude,
            longitude
        `)

        .eq(

            "active",

            true

        )

        .gt(

            "active_until",

            new Date().toISOString()

        )

        .not(

            "latitude",

            "is",

            null

        )

        .not(

            "longitude",

            "is",

            null

        );



    if(error){

        throw error;

    }



    const users =
        data ?? [];



    // ============================================
    // CURRENT LOCATION
    // ============================================

    const location =
        getState(

            "location"

        );



    if(!location){


        return users;


    }



    // ============================================
    // ADD DISTANCE
    // ============================================

    const result =

        users.map(user=>{


            const distance =

                calculateDistance(

                    location.latitude,

                    location.longitude,

                    user.latitude,

                    user.longitude

                );



            return {

                ...user,

                distance

            };


        });



    // ============================================
    // SORT NEAREST FIRST
    // ============================================

    result.sort(

        (a,b)=>{

            return a.distance - b.distance;

        }

    );



    return result;

}