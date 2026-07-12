// ============================================
// LIVE USER MARKERS
// ============================================

import {
    createUserCard
} from "./components/userCard.js";



let markers = [];

let activeCard = null;



// ============================================
// CREATE ICON
// ============================================

function createUserIcon(user){

    let markerClass = "marker-talk";

    if(user.activity_type){

        if(user.activity_type.includes("🍻")){

            markerClass = "marker-drink";

        }

        else if(user.activity_type.includes("☕")){

            markerClass = "marker-coffee";

        }

        else if(user.activity_type.includes("🚶")){

            markerClass = "marker-walk";

        }

    }



    const avatar = user.avatar

        ?

        `<img src="${user.avatar}" alt="">`

        :

        `<span>${getInitials(user)}</span>`;



    let distance = "";

    if(user.distance !== undefined){

        distance = user.distance < 1000

            ?

            `${Math.round(user.distance)} м`

            :

            `${Math.round(user.distance / 100) / 10} км`;

    }



    return L.divIcon({

        className:"user-map-marker",

        html:`

            <div class="marker ${markerClass}">

                <div class="marker-pulse">

                    <div class="marker-avatar">

                        ${avatar}

                        <div class="marker-online"></div>

                    </div>

                </div>

                <div class="marker-name">

                    ${user.first_name ?? "User"}

                </div>

                ${
                    distance

                    ?

                    `

                    <div class="marker-distance">

                        📍 ${distance}

                    </div>

                    `

                    :

                    ""

                }

            </div>

        `,

        iconSize:[90,120],

        iconAnchor:[45,60]

    });

}



// ============================================
// INITIALS
// ============================================

function getInitials(user){

    if(user.first_name){

        return user.first_name.charAt(0).toUpperCase();

    }

    return "👤";

}



// ============================================
// CLEAR
// ============================================

export function clearMarkers(){

    markers.forEach(marker=>marker.remove());

    markers=[];

}



// ============================================
// CLOSE CARD
// ============================================

function closeCard(){

    if(activeCard){

        activeCard.remove();

        activeCard=null;

    }

}



// ============================================
// SHOW CARD
// ============================================

function showCard(user,map){

    closeCard();

    activeCard=createUserCard(

        user,

        map

    );

    document.body.appendChild(activeCard);

}



// ============================================
// ADD
// ============================================

export function addUserMarkers(

    map,

    users

){

    clearMarkers();

    users.forEach(user=>{

        const marker=L.marker(

            [

                user.latitude,

                user.longitude

            ],

            {

                icon:createUserIcon(user)

            }

        );



        marker.addTo(map);



        marker.on(

            "click",

            ()=>{

                showCard(

                    user,

                    map

                );

            }

        );



        markers.push(marker);

    });

}