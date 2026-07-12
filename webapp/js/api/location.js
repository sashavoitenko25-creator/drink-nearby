// ============================================
// LOCATION API
// ============================================

import { db } from "../services/supabase/supabase.js";


// ============================================
// UPDATE USER LOCATION
// ============================================

export async function updateUserLocation(
    userId,
    location
) {


    const { data, error } = await db()

        .from("users")

        .update({

            latitude: location.latitude,

            longitude: location.longitude,

            location_updated_at: new Date()

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