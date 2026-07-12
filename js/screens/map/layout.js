// ============================================
// MAP LAYOUT
// ============================================

import {
    createMapFilters
} from "./components/mapFilters.js";



// ============================================

export function createMapLayout(onFilterChange){

    const root=document.createElement("div");

    root.className="map-screen";



    // =========================================
    // HEADER
    // =========================================

    const header=document.createElement("div");

    header.className="map-header";

    header.innerHTML=`

        <div class="map-title">

            🍻 Drink Nearby

        </div>

    `;



    // =========================================
    // FILTERS
    // =========================================

    const filters=createMapFilters(onFilterChange);



    // =========================================
    // MAP
    // =========================================

    const mapContainer=document.createElement("div");

    mapContainer.className="map-container";



    // =========================================
    // CONTROLS
    // =========================================

    const controls=document.createElement("div");

    controls.className="map-controls";



    const locationButton=document.createElement("button");

    locationButton.className="map-location-button";

    locationButton.innerHTML="📍";



    const activeButton=document.createElement("button");

    activeButton.className="map-active-button";

    activeButton.innerHTML="🟢";



    const testButton=document.createElement("button");

    testButton.className="map-test-button";

    testButton.innerHTML="🤖";



    controls.append(

        locationButton,

        activeButton,

        testButton

    );



    root.append(

        header,

        filters,

        mapContainer,

        controls

    );



    return{

        root,

        mapContainer,

        locationButton,

        activeButton,

        testButton

    };

}