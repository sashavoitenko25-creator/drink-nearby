// ============================================
// MAP
// Drink Nearby
// ============================================

import { CONFIG } from "../core/config.js";

let map = null;

// ============================================
// INIT
// ============================================

export function initMap() {

    map = L.map("map", {

        zoomControl: false,

        attributionControl: false,

        preferCanvas: true

    });

    L.tileLayer(

        CONFIG.map.tileLayer,

        {

            maxZoom: CONFIG.map.maxZoom,

            minZoom: CONFIG.map.minZoom

        }

    ).addTo(map);

    map.setView(

        CONFIG.map.defaultCenter,

        CONFIG.map.defaultZoom

    );

    console.log("Map initialized.");

}

// ============================================
// GET MAP
// ============================================

export function getMap() {

    return map;

}