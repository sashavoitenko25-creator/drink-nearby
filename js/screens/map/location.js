// ============================================
// USER LOCATION MARKER
// ============================================

let userMarker = null;


export function setUserMarker(map, location) {


    if (userMarker) {

        userMarker.remove();

    }


    userMarker = L.marker([

        location.latitude,

        location.longitude

    ]).addTo(map);



    userMarker.bindPopup(

        "📍 You are here"

    );


    map.setView(

        [

            location.latitude,

            location.longitude

        ],

        16

    );


}