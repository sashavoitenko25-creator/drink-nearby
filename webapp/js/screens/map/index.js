// ============================================
// MAP SCREEN
// ============================================


import { initMap } from "./initMap.js";


import {
    getCurrentLocation
} from "../../services/location/location.js";


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
    createTestBots
} from "../../api/testBots.js";


import {
    startLocationTracker
} from "../../services/location/tracker.js";


import {
    startActiveWatcher
} from "../../services/location/activeWatcher.js";


import {
    getState,
    setState
} from "../../core/state.js";




// ============================================


let nearbyInterval = null;


let currentFilter = "all";


let users = [];




// ============================================
// CREATE SCREEN
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







    const testButton =

        document.createElement("button");



    testButton.className =

        "map-test-button";



    testButton.innerHTML =

        "🤖";






    controls.append(

        locationButton,

        activeButton,

        testButton

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
    // FILTER
    // ============================================


    function filterUsers(){



        if(currentFilter === "all"){


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
    // RENDER
    // ============================================


    function renderUsers(){


        if(!map){

            return;

        }



        addUserMarkers(

            map,

            filterUsers()

        );


    }







    // ============================================
    // LOAD USERS
    // ============================================


    async function loadNearbyUsers(){



        try{


            users =

                await getNearbyUsers();



            renderUsers();



            console.log(

                "👥 Nearby:",

                users

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
    // LOCATION
    // ============================================


    locationButton.onclick = async()=>{



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

                location

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

                error

            );


            locationButton.innerHTML =

                "📍";


        }



    };









    // ============================================
    // ACTIVE
    // ============================================


    activeButton.onclick = ()=>{



        const panel =

            createActivePanel(

                async(data)=>{



                    const user =

                        getState(

                            "user"

                        );




                    if(!user){

                        alert(

                            "User not found"

                        );

                        return;

                    }





                    await startActive(

                        user.id,

                        data.minutes,

                        data.activity

                    );





                    startLocationTracker(

                        user.id

                    );





                    startActiveWatcher(

                        user.id,

                        new Date(

                            Date.now()

                            +

                            data.minutes * 60000

                        ),

                        ()=>{


                            loadNearbyUsers();


                        }

                    );





                    panel.remove();




                    await loadNearbyUsers();



                }

            );





        document.body.appendChild(

            panel

        );



    };









    // ============================================
    // TEST BOTS
    // ============================================


    testButton.onclick = async()=>{



        const location =

            getState(

                "location"

            );




        if(!location){


            alert(

                "Сначала нажми 📍"

            );


            return;


        }





        try{


            await createTestBots(

                location.latitude,

                location.longitude

            );



            alert(

                "🤖 Боты созданы"

            );



            await loadNearbyUsers();



        }



        catch(error){


            console.error(

                "Bots error",

                error

            );


        }



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