// ============================================
// ROUTE INFO
// ============================================


import {
    clearRoute
} from "../routeLayer.js";



export function showRouteInfo(data){


    let old =
        document.querySelector(

            ".route-info"

        );



    if(old){

        old.remove();

    }



    const box =
        document.createElement("div");


    box.className =
        "route-info";



    box.innerHTML = `


        <div class="route-header">

            🗺 Маршрут готов


            <button class="route-close">

                ✕

            </button>


        </div>



        <div>

            📍 ${formatDistance(data.distance)}

        </div>



        <div>

            ⏱ ${data.duration} минут

        </div>


    `;



    document.body.appendChild(

        box

    );



    box.querySelector(

        ".route-close"

    )
    .onclick = ()=>{


        clearRoute();


        box.remove();


    };


}




function formatDistance(meters){


    if(meters < 1000){

        return meters + " м";

    }



    return (

        Math.round(

            meters / 100

        )

        /

        10

    )
    +
    " км";


}