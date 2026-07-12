// ============================================
// INIT MAP
// ============================================

let map = null;

export function initMap(container) {

    if (map) {

        map.remove();

        map = null;

    }

    map = L.map(container, {

        zoomControl: true

    });

    map.setView([52.5200, 13.4050], 15);

    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            maxZoom: 20,

            attribution: "&copy; OpenStreetMap"

        }

    ).addTo(map);

    requestAnimationFrame(() => {

        map.invalidateSize();

    });

    return map;

}