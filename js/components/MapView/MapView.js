/**
 * ============================================================
 * Компанько
 * MapView Component
 * ------------------------------------------------------------
 * Отвечает за:
 * - создание Leaflet карты
 * - подключение тёмной карты
 * - управление контейнером карты
 *
 * Не отвечает за:
 * - GPS
 * - маркер пользователя
 * - пользователей вокруг
 * ============================================================
 */


class MapView {


    constructor() {


        this.element = null;


        this.map = null;


    }





    create() {



        const wrapper = document.createElement('div');


        wrapper.className = 'map-view';




        wrapper.innerHTML = `

            <div class="map-view__container"></div>

        `;




        this.element = wrapper;



        this.container =

            wrapper.querySelector(
                '.map-view__container'
            );




        this.initMap();




        return wrapper;


    }








    initMap(){



        this.map = L.map(

            this.container,

            {


                zoomControl:false,


                attributionControl:false,


                center:[50.4501,30.5234],


                zoom:13



            }


        );







        /*
        ====================================
        DARK MAP
        ====================================
        */


        L.tileLayer(


            'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',


            {


                attribution:

                '&copy; OpenStreetMap &copy; CARTO',


                subdomains:

                'abcd',


                maxZoom:19



            }


        )

        .addTo(this.map);







        /*
        ====================================
        исправление размера
        ====================================
        */


        setTimeout(()=>{


            this.map.invalidateSize();


        },300);



    }







    getMap(){


        return this.map;


    }





    getInstance(){


        return this.map;


    }








    destroy(){



        if(this.map){


            this.map.remove();


            this.map=null;


        }



        this.element?.remove();


        this.element=null;



    }



}




export default MapView;