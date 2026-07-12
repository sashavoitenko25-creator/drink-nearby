// ============================================
// MAP SCREEN
// ============================================

import { initMap } from "./initMap.js";

import {
    getCurrentLocation
} from "../../services/location/location.js";

import {
    startLocationTracker
} from "../../services/location/tracker.js";

import {
    startActiveWatcher
} from "../../services/location/activeWatcher.js";

import {
    setUserMarker
} from "./location.js";

import {
    updateUserLocation
} from "../../api/location.js";

import {
    getNearbyUsers
} from "../../api/nearby.js";

import {
    addUserMarkers
} from "./markers.js";

import {
    startActive
} from "../../api/active.js";

import {
    createActivePanel
} from "./components/activePanel.js";

import {
    createMapFilters
} from "./components/mapFilters.js";

import {
    getState,
    setState
} from "../../core/state.js";


// ============================================

let nearbyInterval = null;

let currentFilter = "all";

let mapUsers = [];


// ============================================
// CREATE MAP SCREEN
// ============================================

export function createMapScreen(){


    const screen =
        document.createElement("div");


    screen.className =
        "map-screen";



    // HEADER

    const header =
        document.createElement("div");


    header.className =
        "map-header";


    header.innerHTML = `

        <div class="map-title">

            🍻 Drink Nearby

        </div>

    `;



    // MAP

    const mapContainer =
        document.createElement("div");


    mapContainer.className =
        "map-container";



    // CONTROLS

    const controls =
        document.createElement("div");


    controls.className =
        "map-controls";



    const locationButton =
        document.createElement("button");


    locationButton.className =
        "map-location-button";


    locationButton.innerHTML =
        "📍";



    const activeButton =
        document.createElement("button");


    activeButton.className =
        "map-active-button";


    activeButton.innerHTML =
        "🟢";



    controls.append(

        locationButton,

        activeButton

    );



    // FILTERS

    const filters =
        createMapFilters(

            (type)=>{


                currentFilter = type;


                renderUsers();


            }

        );



    screen.append(

        header,

        filters,

        mapContainer,

        controls

    );



    let map = null;



    // ============================================
    // FILTER USERS
    // ============================================

    function filterUsers(users){


        if(

            currentFilter === "all"

        ){

            return users;

        }



        return users.filter(user=>{


            return user.activity_type

                ?

                user.activity_type.includes(

                    currentFilter

                )

                :

                false;


        });


    }



    // ============================================
    // RENDER MARKERS
    // ============================================

    function renderUsers(){


        if(!map){

            return;

        }



        const filtered =

            filterUsers(

                mapUsers

            );



        addUserMarkers(

            map,

            filtered

        );


    }



    // ============================================
    // LOAD USERS
    // ============================================

    async function loadNearbyUsers(){


        if(!map){

            return;

        }



        try{


            mapUsers =

                await getNearbyUsers();



            renderUsers();



            console.log(

                "👥 Users:",

                mapUsers

            );


        }


        catch(error){


            console.error(

                "Nearby error",

                error

            );


        }


    }





    // ============================================
    // INIT MAP
    // ============================================

    setTimeout(()=>{


        map =

            initMap(

                mapContainer

            );



        setState(

            "map",

            {

                instance:map

            }

        );



        loadNearbyUsers();



        nearbyInterval =

            setInterval(

                loadNearbyUsers,

                5000

            );



    },0);





    // ============================================
    // LOCATION BUTTON
    // ============================================

    locationButton.onclick =

        async()=>{


            try{


                locationButton.innerHTML =
                    "⌛";



                const location =

                    await getCurrentLocation();



                setUserMarker(

                    map,

                    location

                );



                setState(

                    "location",

                    {

                        latitude:
                            location.latitude,

                        longitude:
                            location.longitude,

                        accuracy:
                            location.accuracy

                    }

                );



                const user =

                    getState(

                        "user"

                    );



                if(user){


                    await updateUserLocation(

                        user.id,

                        location

                    );


                }



                await loadNearbyUsers();



                locationButton.innerHTML =
                    "📍";


            }


            catch(error){


                console.error(

                    "Location error",

                    error

                );


                locationButton.innerHTML =
                    "📍";


            }


        };





    // ============================================
    // ACTIVE BUTTON
    // ============================================

    activeButton.onclick =

        ()=>{


            const panel =

                createActivePanel(

                    async({

                        minutes,

                        activity

                    })=>{


                        const user =

                            getState(

                                "user"

                            );



                        if(!user){

                            return;

                        }



                        try{


                            await startActive(

                                user.id,

                                minutes,

                                activity

                            );



                            startLocationTracker(

                                user.id

                            );



                            startActiveWatcher(

                                user.id,

                                new Date(

                                    Date.now()

                                    +

                                    minutes * 60000

                                ),


                                ()=>{


                                    activeButton.innerHTML =
                                        "🟢";


                                    loadNearbyUsers();


                                }

                            );



                            panel.remove();



                            await loadNearbyUsers();


                        }


                        catch(error){


                            console.error(

                                "Active error",

                                error

                            );


                        }


                    }

                );



            document.body.appendChild(

                panel

            );


        };





    // ============================================
    // CLEANUP
    // ============================================

    screen.addEventListener(

        "remove",

        ()=>{


            if(nearbyInterval){


                clearInterval(

                    nearbyInterval

                );


            }


        }

    );



    return screen;

}