// ============================================
// ROUTE LAYER
// ============================================


let currentRoute = null;


// ============================================
// CLEAR ROUTE
// ============================================

export function clearRoute(){


    if(currentRoute){


        currentRoute.remove();


        currentRoute = null;


    }


}



// ============================================
// DRAW ROUTE
// ============================================

export function drawRoute(

    map,

    coordinates

){


    clearRoute();



    const points =
        coordinates.map(point=>{


            return [

                point[1],

                point[0]

            ];


        });



    currentRoute =
        L.polyline(

            points,

            {

                weight:6,

                opacity:0.9

            }

        );



    currentRoute.addTo(map);



    map.fitBounds(

        currentRoute.getBounds(),

        {

            padding:[60,60]

        }

    );



    return currentRoute;


}