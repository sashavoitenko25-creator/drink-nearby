// ============================================
// ACTIVE USER API
// ============================================

import { db } from "../services/supabase/supabase.js";


// ============================================
// START ACTIVE
// ============================================

export async function startActive(
    userId,
    minutes,
    activityType
){

    const until = new Date(
        Date.now() + minutes * 60000
    );


    const { data, error } = await db()

        .from("users")

        .update({

            active: true,

            active_until: until,

            activity_type: activityType

        })

        .eq(
            "id",
            userId
        )

        .select()

        .single();


    if(error){

        throw error;

    }


    return data;

}



// ============================================
// STOP ACTIVE
// ============================================

export async function stopActive(userId){


    const { data, error } = await db()

        .from("users")

        .update({

            active:false,

            active_until:null

        })

        .eq(
            "id",
            userId
        )

        .select()

        .single();



    if(error){

        throw error;

    }


    return data;

}

// ============================================
// SET INACTIVE
// ============================================

export async function setInactive(userId){


    const {
        error
    } = await supabase

        .from("active_sessions")

        .update({

            active:false

        })

        .eq(

            "user_id",

            userId

        );



    if(error){

        throw error;

    }


}