/**
 * ============================================================
 * Компанько
 * Telegram Service
 * ============================================================
 *
 * Работа с Telegram Mini App API
 *
 * Получает:
 * - Telegram ID
 * - имя
 * - фото
 *
 * Username нигде не используется
 * ============================================================
 */


class TelegramService {


    constructor(){


        this.tg = null;


        if(
            window.Telegram &&
            window.Telegram.WebApp
        ){

            this.tg = window.Telegram.WebApp;

        }


    }






    init(){


        if(!this.tg){

            console.warn(
                '[TelegramService] Telegram API not found'
            );

            return;

        }



        this.tg.ready();


        this.tg.expand();


        console.log(
            '[TelegramService] initialized'
        );


    }







    getUser(){


        if(!this.tg){

            return null;

        }



        if(
            this.tg.initDataUnsafe &&
            this.tg.initDataUnsafe.user
        ){

            return this.tg.initDataUnsafe.user;

        }



        return null;


    }







    getId(){


        const user = this.getUser();



        if(user){

            return user.id;

        }



        return null;


    }







    getName(){


        const user = this.getUser();



        if(user){

            return user.first_name || '';

        }



        return '';

    }







    getPhoto(){


        const user = this.getUser();



        if(
            user &&
            user.photo_url
        ){

            return user.photo_url;

        }



        return null;


    }



}



export default new TelegramService();