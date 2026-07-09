// =================================
// MAP ENGINE
// Drink Nearby
// =================================


let map = null;



function initMap(){


    map = L.map(
        "map",
        {

            zoomControl:false,

            attributionControl:false

        }
    );



    L.tileLayer(

        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            maxZoom:19

        }

    ).addTo(map);



    map.setView(

        [0,0],

        2

    );



    console.log(
        "Map initialized"
    );



    return map;


}