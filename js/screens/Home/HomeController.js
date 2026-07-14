/**
 * ============================================================
 * Компанько
 * Home Controller
 * ============================================================
 *
 * Управляет Home экраном.
 *
 * Ответственность:
 * - создание компонентов
 * - запуск карты
 * - запуск геолокации
 * - запуск Live режима
 *
 * ============================================================
 */


import HomeScreen from './HomeScreen.js';


import Header from '../../components/Header/index.js';

import Greeting from '../../components/Greeting/index.js';
import Logo from '../../components/Logo/index.js';
import Population from '../../components/Population/index.js';
import ProfileButton from '../../components/ProfileButton/index.js';
import OnlineStatus from '../../components/OnlineStatus/index.js';


import ActivityBar from "../../components/ActivityBar/index.js";
import TopBar from '../../components/TopBar/index.js';


import LiveButton from '../../components/LiveButton/index.js';
import ProfileCard from '../../components/ProfileCard/index.js';
import LiveSheet from "../../components/LiveSheet/index.js";


import MapView from '../../components/MapView/index.js';
import MyLocation from '../../components/MyLocation/index.js';


import LocationService from '../../services/LocationService.js';


import LiveController from '../../controllers/LiveController.js';


import EventBus, { Events } from '../../core/EventBus.js';



class HomeController {


    constructor(){


        this.screen = null;


        this.header = null;


        this.greeting = null;

        this.logo = null;

        this.population = null;

        this.onlineStatus = null;

        this.profileButton = null;



        this.activityBar = null;

        this.topBar = null;



        this.mapView = null;

        this.myLocation = null;



        this.liveButton = null;

        this.profileCard = null;

        this.liveSheet = null;



        this.unsubscribe = [];


    }





    init(container){


        this.screen = new HomeScreen();


        this.screen.render(container);



        this.initializeComponents();


        this.subscribe();


        this.startLocation();



    }







    initializeComponents(){


        this.createHeader();


        this.createActivityBar();


        this.createMap();


        this.createTopBar();


        this.createBottom();


        this.createLiveSheet();


    }







    createHeader(){


        this.header = new Header();


        this.header.render(

            this.screen.getRegion('header')

        );




        this.greeting = new Greeting();


        this.header
            .getRegion('left')
            .appendChild(

                this.greeting.create()

            );




        this.logo = new Logo();


        this.header
            .getRegion('left')
            .appendChild(

                this.logo.create()

            );




        this.population = new Population();


        this.header
            .getRegion('right')
            .appendChild(

                this.population.create()

            );




        this.onlineStatus = new OnlineStatus();


        this.header
            .getRegion('right')
            .appendChild(

                this.onlineStatus.create()

            );




        this.profileButton = new ProfileButton();


        this.header
            .getRegion('right')
            .appendChild(

                this.profileButton.create()

            );


    }








    createActivityBar(){


        const content =

            this.screen.getRegion('content');



        this.activityBar =

            new ActivityBar(content);



        this.activityBar.render();


    }








    createTopBar(){


        this.topBar = new TopBar();



        this.screen
            .getRegion('content')
            .appendChild(

                this.topBar.create()

            );


    }








    createMap(){


        this.mapView = new MapView();



        this.screen
            .getRegion('content')
            .appendChild(

                this.mapView.create()

            );



        this.myLocation = new MyLocation(

            this.mapView.getInstance()

        );


    }









    createBottom(){


        const bottom =

            this.screen.getRegion('bottom');




        this.liveButton = new LiveButton();



        bottom.appendChild(

            this.liveButton.create()

        );





        this.profileCard = new ProfileCard();



        bottom.appendChild(

            this.profileCard.create()

        );



    }










    createLiveSheet(){


        this.liveSheet = new LiveSheet();



        this.liveSheet.render(

            document.body

        );


    }









    subscribe(){



        this.unsubscribe.push(


            EventBus.on(

                Events.LOCATION_UPDATED,


                position => {



                    console.log(

                        '[HomeController] location:',

                        position

                    );



                    if(

                        this.myLocation &&

                        position

                    ){


                        this.myLocation.update(

                            position

                        );


                    }


                }


            )


        );



    }










    startLocation(){



        LocationService

            .getCurrentPosition()

            .catch(

                error => {


                    console.warn(

                        'Location error:',

                        error

                    );


                }

            );




        LocationService.watch();



    }










    destroy(){



        LiveController.stop();




        this.unsubscribe.forEach(

            fn => fn()

        );


        this.unsubscribe = [];




        LocationService.stop();





        if(this.liveSheet){

            this.liveSheet.destroy();

        }



        if(this.profileCard){

            this.profileCard.destroy();

        }



        if(this.liveButton){

            this.liveButton.destroy();

        }



        if(this.myLocation){

            this.myLocation.destroy();

        }



        if(this.mapView){

            this.mapView.destroy();

        }



        if(this.greeting){

            this.greeting.destroy();

        }



        if(this.logo){

            this.logo.destroy();

        }



        if(this.population){

            this.population.destroy();

        }



        if(this.onlineStatus){

            this.onlineStatus.destroy();

        }



        if(this.profileButton){

            this.profileButton.destroy();

        }



        if(this.activityBar){

            this.activityBar.destroy();

        }



        if(this.topBar){

            this.topBar.destroy();

        }



        if(this.header){

            this.header.destroy();

        }



        if(this.screen){

            this.screen.destroy();

        }



        this.screen = null;


    }



}



export default HomeController;