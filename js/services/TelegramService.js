/**
 * Компанько
 * Telegram Service
 */

class TelegramService {


    constructor(){

        this.tg = window.Telegram?.WebApp || null;

    }



    init(){

        if(!this.tg){

            console.warn(
                "Telegram WebApp API not found"
            );

            return;

        }


        this.tg.ready();

        this.tg.expand();

    }





    getUser(){

        if(!this.tg){

            return null;

        }


        return this.tg.initDataUnsafe?.user || null;

    }





    getPhoto(){

        const user = this.getUser();


        if(!user){

            return null;

        }


        return user.photo_url || null;

    }





    getId(){

        const user = this.getUser();


        return user?.id || null;

    }



}


export default new TelegramService();