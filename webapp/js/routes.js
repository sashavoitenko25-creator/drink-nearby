// =================================
// ROUTES
// Drink Nearby
// =================================

let routingControl = null;

let currentTravelMode = "foot";

// =================================
// Построить маршрут
// =================================

function buildRoute(lat, lon) {

    if (!userPosition || !map) {
        return;
    }

    clearRoute();

    routingControl = L.Routing.control({

        waypoints: [

            L.latLng(userPosition.lat, userPosition.lon),

            L.latLng(lat, lon)

        ],

        routeWhileDragging: false,

        addWaypoints: false,

        draggableWaypoints: false,

        fitSelectedRoutes: true,

        show: false,

        lineOptions: {

            styles: [

                {

                    color: "#2F80ED",

                    opacity: 0.9,

                    weight: 6

                }

            ]

        },

        createMarker: function () {

            return null;

        },

        router: L.Routing.osrmv1({

            profile: currentTravelMode === "car"

                ? "driving"

                : "foot"

        })

    }).addTo(map);

}

// =================================
// Очистить маршрут
// =================================

function clearRoute() {

    if (routingControl) {

        map.removeControl(routingControl);

        routingControl = null;

    }

}

// =================================
// Пешком
// =================================

function setWalkingMode() {

    currentTravelMode = "foot";

}

// =================================
// Машина
// =================================

function setDrivingMode() {

    currentTravelMode = "car";

}