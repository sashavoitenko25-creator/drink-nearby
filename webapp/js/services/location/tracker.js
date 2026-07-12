// ============================================
// LOCATION TRACKER
// ============================================


import {
    getCurrentLocation
} from "./location.js";


import {
    updateUserLocation
} from "../../api/location.js";



let tracker = null;



// ============================================
// START TRACKING
// ============================================

export function startLocationTracker(userId){


    if(tracker){

        return;

    }



    tracker = setInterval(

        async()=>{


            try{


                const location =
                    await getCurrentLocation();



                await updateUserLocation(

                    userId,

                    location

                );



                console.log(

                    "📍 Location updated",

                    location

                );


            }


            catch(error){


                console.error(

                    "Tracker error",

                    error

                );


            }



        },

        10000

    );


}




// ============================================
// STOP TRACKING
// ============================================

export function stopLocationTracker(){


    if(tracker){


        clearInterval(

            tracker

        );


        tracker = null;


    }


}