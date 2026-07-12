// ============================================
// USER CARD 2.0
// ============================================


import {
    createRoutePanel
} from "./routePanel.js";


import {
    getRoute
} from "../routing.js";


import {
    drawRoute
} from "../routeLayer.js";


import {
    showRouteInfo
} from "./routeInfo.js";


import {
    getState
} from "../../../core/state.js";




// ============================================
// CREATE USER CARD
// ============================================


export function createUserCard(

    user,

    map

){


    const card =

        document.createElement("div");



    card.className =

        "user-card";




    const name =

        user.first_name

        ??

        "User";




    const activity =

        user.activity_type

        ??

        "💬 Talk";




    let distance =

        "Рядом";




    if(user.distance !== undefined){


        distance =


            user.distance < 1000


            ?


            `${user.distance} м`


            :


            `${

                Math.round(

                    user.distance / 100

                )

                /

                10

            } км`;


    }




    let activeTime = "";




    if(user.active_until){


        const diff =

            new Date(

                user.active_until

            )

            -

            new Date();




        const minutes =

            Math.max(

                0,

                Math.floor(

                    diff / 60000

                )

            );



        activeTime =

            `${minutes} мин`;

    }






    card.innerHTML = `



        <button class="user-card-close">

            ✕


        </button>




        <div class="user-card-avatar">


            ${
                user.avatar

                ?

                `<img src="${user.avatar}">`

                :

                "👤"

            }


        </div>





        <div class="user-card-content">



            <div class="user-card-name">


                ${name}

                ${
                    user.age

                    ?

                    ", "

                    +

                    user.age

                    :

                    ""

                }


            </div>




            <div class="user-card-online">


                🟢 Сейчас ищет собеседника


            </div>





            <div class="user-card-tag">


                ${activity}


            </div>





            <div class="user-card-info-line">


                📍 ${distance}


            </div>





            ${
                activeTime


                ?


                `


                <div class="user-card-info-line">


                    ⏳ Активен ещё ${activeTime}


                </div>


                `


                :


                ""

            }




        </div>





        <button class="user-route-button">


            🧭


        </button>




    `;





    // ============================================
    // CLOSE
    // ============================================


    card
    .querySelector(

        ".user-card-close"

    )
    .onclick = ()=>{


        card.remove();


    };





    // ============================================
    // ROUTE
    // ============================================


    card
    .querySelector(

        ".user-route-button"

    )
    .onclick = ()=>{


        const panel =

            createRoutePanel(

                async(mode)=>{


                    try{


                        const location =

                            getState(

                                "location"

                            );



                        if(!location){


                            alert(

                                "Сначала нажми 📍"

                            );


                            return;

                        }





                        const route =

                            await getRoute(

                                {


                                    latitude:

                                        location.latitude,


                                    longitude:

                                        location.longitude


                                },


                                {


                                    latitude:

                                        user.latitude,


                                    longitude:

                                        user.longitude


                                },


                                mode


                            );





                        drawRoute(

                            map,

                            route.geometry

                        );





                        showRouteInfo(

                            route

                        );



                    }



                    catch(error){


                        console.error(

                            "Route error",

                            error

                        );


                    }



                }


            );



        document.body.appendChild(

            panel

        );



    };




    return card;


}