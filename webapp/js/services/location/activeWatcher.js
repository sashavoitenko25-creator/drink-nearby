// ============================================
// ACTIVE WATCHER
// ============================================


import {
    setInactive
} from "../../api/active.js";


let watcher = null;



// ============================================
// START WATCH
// ============================================

export function startActiveWatcher(

    userId,

    expiresAt,

    onExpire

){


    if(watcher){

        clearInterval(watcher);

    }



    watcher = setInterval(

        async()=>{


            const now =
                new Date();



            const end =
                new Date(

                    expiresAt

                );



            if(now >= end){


                try{


                    await setInactive(

                        userId

                    );


                    console.log(

                        "🔴 Active expired"

                    );



                    clearInterval(

                        watcher

                    );


                    watcher = null;



                    if(onExpire){

                        onExpire();

                    }


                }


                catch(error){


                    console.error(

                        "Expire error",

                        error

                    );


                }


            }



        },

        10000

    );


}