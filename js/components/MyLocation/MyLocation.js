/**
 * ============================================================
 * Компанько
 * My Location Component
 * ============================================================
 *
 * Показывает позицию текущего пользователя.
 *
 * Ответственность:
 * - создание маркера пользователя
 * - обновление позиции
 * - визуализация LIVE точки
 *
 * ============================================================
 */


class MyLocation {


    constructor(map) {


        this.map = map;


        this.marker = null;


        this.circle = null;


        this.position = null;


        this.firstPosition = true;


    }





    update(position) {



        if (!position) {

            return;

        }




        const lat = Number(

            position.lat ??
            position.latitude ??
            position.coords?.latitude

        );



        const lng = Number(

            position.lng ??
            position.longitude ??
            position.coords?.longitude

        );





        if (

            !Number.isFinite(lat) ||

            !Number.isFinite(lng)

        ) {


            console.warn(

                '[MyLocation] Invalid coordinates',

                position

            );


            return;


        }





        const coords = [

            lat,

            lng

        ];





        this.position = {

            lat,

            lng

        };






        /*
        ======================================
        Создание маркера
        ======================================
        */


        if(!this.marker){



            this.marker = L.marker(

                coords,

                {


                    icon:


                    L.divIcon({


                        className:

                            'my-location-marker',



                        html:


                        `

                        <div class="location-pulse"></div>


                        <div class="location-ring"></div>


                        <div class="location-dot">

                            <div class="location-core"></div>

                        </div>


                        `,



                        iconSize:[60,60],


                        iconAnchor:[30,30]


                    })


                }


            )
            .addTo(this.map);







            this.circle = L.circle(

                coords,

                {


                    radius:40,


                    color:'#2f80ff',


                    fillColor:'#2f80ff',


                    fillOpacity:0.12,


                    weight:1



                }


            )
            .addTo(this.map);






            if(this.firstPosition){


                this.map.flyTo(

                    coords,

                    16,

                    {

                        duration:1.5

                    }

                );


                this.firstPosition=false;


            }



            return;


        }





        /*
        ======================================
        Обновление позиции
        ======================================
        */


        this.marker.setLatLng(

            coords

        );



        this.circle.setLatLng(

            coords

        );



    }






    destroy(){



        if(this.marker){


            this.map.removeLayer(

                this.marker

            );


        }





        if(this.circle){


            this.map.removeLayer(

                this.circle

            );


        }




        this.marker=null;


        this.circle=null;


    }



}



export default MyLocation;