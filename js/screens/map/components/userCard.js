// ============================================
// LIVE USER CARD
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



    let timeLeft = "";



    if(user.active_until){


        const diff =
            new Date(user.active_until)
            -
            new Date();



        const minutes =
            Math.max(

                0,

                Math.floor(

                    diff / 60000

                )

            );



        timeLeft =
            `${minutes} мин`;


    }



    let distanceText = "";



    if(user.distance !== undefined){


        if(user.distance < 1000){


            distanceText =

                `📍 ${user.distance} м`;


        }

        else{


            distanceText =

                `📍 ${
                    Math.round(

                        user.distance / 100

                    )

                    /

                    10

                } км`;


        }


    }




    let walkingTime = "";



    if(user.distance !== undefined){


        const minutes =

            Math.ceil(

                user.distance / 80

            );



        walkingTime =

            `🚶 ~${minutes} мин пешком`;


    }




    card.innerHTML = `


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
                    `, ${user.age}`
                    :
                    ""
                }

            </div>



            <div class="user-card-status">

                🟢 Сейчас на карте

            </div>



            <div class="user-card-activity">

                ${activity}

            </div>



            ${
                distanceText

                ?

                `

                <div class="user-card-distance">

                    ${distanceText}

                </div>

                `

                :

                ""

            }




            ${
                walkingTime

                ?

                `

                <div class="user-card-walk">

                    ${walkingTime}

                </div>

                `

                :

                ""

            }




            ${
                timeLeft

                ?

                `

                <div class="user-card-time">

                    ⏳ ${timeLeft}

                </div>

                `

                :

                ""

            }


        </div>




        <button class="user-route-button">

            🗺 Маршрут

        </button>


    `;




    // ============================================
    // ROUTE
    // ============================================


    const routeButton =
        card.querySelector(

            ".user-route-button"

        );



    routeButton.onclick =
        ()=>{


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