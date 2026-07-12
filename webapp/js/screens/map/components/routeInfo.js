// ============================================
// ROUTE INFO 2.0
// ============================================

import {
    clearRoute
} from "../routeLayer.js";



let currentPanel = null;



// ============================================
// SHOW
// ============================================

export function showRouteInfo(route){

    if(currentPanel){

        currentPanel.remove();

    }

    const panel = document.createElement("div");

    panel.className = "route-info";



    panel.innerHTML = `

        <button class="route-close">

            ✕

        </button>



        <div class="route-info-title">

            🧭 Маршрут построен

        </div>



        <div class="route-info-distance">

            📍 ${formatDistance(route.distance)}

        </div>



        <div class="route-info-time">

            🚶 ${formatTime(route.duration)}

        </div>



        <div class="route-divider"></div>



        <div class="route-info-text">

            Следуйте по синей линии на карте

        </div>

    `;



    panel
        .querySelector(".route-close")
        .onclick = ()=>{

            clearRoute();

            panel.remove();

            currentPanel = null;

        };



    document.body.appendChild(panel);



    currentPanel = panel;

}



// ============================================
// DISTANCE
// ============================================

function formatDistance(distance){

    if(distance < 1000){

        return Math.round(distance) + " м";

    }

    return (

        Math.round(distance / 100)

        /

        10

    ) + " км";

}



// ============================================
// TIME
// ============================================

function formatTime(seconds){

    const minutes =

        Math.max(

            1,

            Math.round(

                seconds / 60

            )

        );



    return `${minutes} мин`;

}