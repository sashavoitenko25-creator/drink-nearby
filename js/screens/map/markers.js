// ============================================
// USER MARKERS
// ============================================

import {
    createUserCard
} from "./components/userCard.js";


let markers = [];

let activeCard = null;



// ============================================
// CUSTOM ICON
// ============================================

function createUserIcon(user){


    let emoji = "💬";

    let color = "blue";



    if(user.activity_type){


        if(user.activity_type.includes("🍻")){

            emoji = "🍻";

            color = "red";

        }


        else if(
            user.activity_type.includes("☕")
        ){

            emoji = "☕";

            color = "brown";

        }


        else if(
            user.activity_type.includes("🚶")
        ){

            emoji = "🚶";

            color = "green";

        }


        else{

            emoji = "💬";

            color = "blue";

        }


    }



    let distance = "";



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



    return L.divIcon({

        className:

            "user-map-marker",



        html:`


            <div class="marker-pulse ${color}">


                <div class="marker-icon">

                    ${emoji}

                </div>


            </div>



            <div class="marker-name">

                ${
                    user.first_name
                    ??
                    "User"
                }

            </div>



            ${
                distance

                ?

                `

                <div class="marker-distance">

                    ${distance}

                </div>

                `

                :

                ""

            }


        `,



        iconSize:[

            80,

            90

        ],



        iconAnchor:[

            40,

            45

        ]

    });


}



// ============================================
// CLEAR MARKERS
// ============================================

export function clearMarkers(){


    markers.forEach(marker=>{


        marker.remove();


    });



    markers = [];



}



// ============================================
// CLOSE CARD
// ============================================

function closeUserCard(){


    if(activeCard){


        activeCard.remove();


        activeCard = null;


    }


}



// ============================================
// SHOW USER CARD
// ============================================

function showUserCard(

    user,

    map

){


    closeUserCard();



    activeCard =

        createUserCard(

            user,

            map

        );



    document.body.appendChild(

        activeCard

    );


}



// ============================================
// ADD USER MARKERS
// ============================================

export function addUserMarkers(

    map,

    users

){


    clearMarkers();



    users.forEach(user=>{


        const marker =

            L.marker(

                [

                    user.latitude,

                    user.longitude

                ],

                {

                    icon:

                        createUserIcon(user)

                }

            );



        marker.addTo(map);



        marker.on(

            "click",

            ()=>{


                showUserCard(

                    user,

                    map

                );


            }

        );



        markers.push(

            marker

        );



    });


}