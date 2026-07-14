/**
 * ============================================================
 * Компанько
 * Application Entry
 * ============================================================
 */


import Store from './js/core/Store.js';


import EventBus from './js/core/EventBus.js';


import LanguageService from './js/services/LanguageService.js';


import TelegramService from './js/services/TelegramService.js';


import HomeController from './js/screens/Home/HomeController.js';






class App {



    constructor(){


        this.currentScreen = null;


        this.container = null;


    }







    async init(){


        console.log(
            '[App] start'
        );



        this.container =
            document.getElementById('app');



        if(!this.container){


            console.error(
                '[App] #app not found'
            );


            return;

        }





        await this.initializeServices();



        this.openHome();



    }







    async initializeServices(){



        LanguageService.init();



        TelegramService.init();



        const user =
            TelegramService.getUser();




        if(user){



            Store.set(

                'profile',

                {

                    telegramId:user.id,


                    name:
                        user.first_name || '',


                    avatar:
                        user.photo_url || null

                }

            );



            console.log(

                '[App] Telegram user:',

                user

            );


        }



    }








    openHome(){


        this.destroyCurrentScreen();



        this.currentScreen =
            new HomeController();



        this.currentScreen.init(

            this.container

        );


    }








    destroyCurrentScreen(){



        if(this.currentScreen){


            this.currentScreen.destroy();


        }



        this.currentScreen = null;



    }



}






const app = new App();



window.addEventListener(

    'load',

    ()=>{


        app.init();


    }

);