// ============================================
// LOCATION
// ============================================

import { CONFIG } from "../core/config.js";
import { getMap } from "./map.js";

let userPosition = null;

let userMarker = null;

// ============================================
// INIT
// ============================================

export function initLocation() {

    if (!navigator.geolocation) {

        console.warn("Geolocation not supported.");

        return;

    }

    navigator.geolocation.watchPosition(

        updateLocation,

        locationError,

        {

            enableHighAccuracy: CONFIG.gps.enableHighAccuracy,

            timeout: CONFIG.gps.timeout,

            maximumAge: CONFIG.gps.maximumAge

        }

    );

}

// ============================================

function updateLocation(position) {

    userPosition = {

        lat: position.coords.latitude,

        lng: position.coords.longitude

    };

    const map = getMap();

    if (!map) {

        return;

    }

    if (!userMarker) {

        userMarker = L.circleMarker(

            [

                userPosition.lat,

                userPosition.lng

            ],

            {

                radius: 10,

                color: "#2563EB",

                fillColor: "#3B82F6",

                fillOpacity: 1,

                weight: 3

            }

        ).addTo(map);

        map.setView(

            [

                userPosition.lat,

                userPosition.lng

            ],

            16

        );

    }

    else {

        userMarker.setLatLng(

            [

                userPosition.lat,

                userPosition.lng

            ]

        );

    }

}

// ============================================

function locationError(error) {

    console.error(error);

}

// ============================================

export function getUserPosition() {

    return userPosition;

}