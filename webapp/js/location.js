// =================================
// LOCATION
// =================================



let userPosition = null;



function locateUser(){


    if(!navigator.geolocation){


        console.log(
            "GPS unavailable"
        );


        return;

    }



    navigator.geolocation.getCurrentPosition(


        (position)=>{


            userPosition = {


                lat:
                position.coords.latitude,


                lon:
                position.coords.longitude


            };



            console.log(
                "User position",
                userPosition
            );



            if(map){


                map.setView(

                    [
                        userPosition.lat,
                        userPosition.lon
                    ],

                    16,

                    {

                    animate:true

                    }

                );


            }


        },


        (error)=>{


            console.log(
                "GPS error",
                error
            );


        },


        {

            enableHighAccuracy:true

        }


    );


}