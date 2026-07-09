// =====================================
// Supabase API
// Drink Nearby
// =====================================


const SUPABASE_CONFIG = {


    url: "https://uqjqzaxbgqkwlmsubmnp.supabase.co",


    key: "sb_publishable_7YgpYATYssr3vn62KcVObg_I8zvjhCT"


};



let supabaseClient = null;



function initSupabase(){


    if(!SUPABASE_CONFIG.url ||
       !SUPABASE_CONFIG.key){


        console.log(
            "Supabase keys not configured"
        );


        return null;

    }



    supabaseClient =
        supabase.createClient(
            SUPABASE_CONFIG.url,
            SUPABASE_CONFIG.key
        );



    console.log(
        "Supabase connected"
    );


    return supabaseClient;

}



async function testDatabase(){


    if(!supabaseClient){

        console.log(
            "Database not initialized"
        );

        return;

    }



    const {data,error} =
        await supabaseClient
        .from("posts")
        .select("*")
        .limit(1);



    if(error){

        console.error(
            "Database error",
            error
        );

        return;

    }



    console.log(
        "Database OK",
        data
    );


}