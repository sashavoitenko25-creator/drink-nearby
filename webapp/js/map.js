// =================================
// MAP ENGINE
// Drink Nearby
// =================================

let map = null;

// ================================
// Layers
// ================================

let userLayer = L.layerGroup();
let meetingLayer = L.layerGroup();
let routeLayer = L.layerGroup();
let placesLayer = L.layerGroup();

// ================================
// Init Map
// ================================

function initMap() {

    map = L.map("map", {
        zoomControl: false,
        attributionControl: false
    });

    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19
        }
    ).addTo(map);

    // Подключаем слои
    userLayer.addTo(map);
    meetingLayer.addTo(map);
    routeLayer.addTo(map);
    placesLayer.addTo(map);

    // Стартовая позиция
    map.setView([0, 0], 2);

    console.log("✅ Map initialized");

    return map;
}

// ================================
// Getters
// ================================

function getMap() {
    return map;
}

function getUserLayer() {
    return userLayer;
}

function getMeetingLayer() {
    return meetingLayer;
}

function getRouteLayer() {
    return routeLayer;
}

function getPlacesLayer() {
    return placesLayer;
}

// ================================
// Helpers
// ================================

function clearMeetings() {
    meetingLayer.clearLayers();
}

function clearRoutes() {
    routeLayer.clearLayers();
}

function clearPlaces() {
    placesLayer.clearLayers();
}