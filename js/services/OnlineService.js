/**
 * ============================================================
 * Компанько
 * Online Service
 * ------------------------------------------------------------
 * Управляет статусом онлайн пользователя.
 *
 * Ответственность:
 * - включение онлайн режима
 * - обновление активности
 * - получение текущего статуса
 *
 * Не отвечает за:
 * - интерфейс
 * - карту
 * - пользователей
 * ============================================================
 */


import Store from '../core/Store.js';


class OnlineService {


    constructor() {

        this.interval = null;

    }



    start() {


        Store.set(

            'online',

            {

                status: true,

                lastSeen: Date.now()

            }

        );



        this.startHeartbeat();


    }





    heartbeat() {


        const online =
            Store.get('online') || {};



        Store.set(

            'online',

            {

                ...online,

                status: true,

                lastSeen: Date.now()

            }

        );


    }





    startHeartbeat() {


        if(this.interval){

            return;

        }



        this.interval = setInterval(

            () => {

                this.heartbeat();

            },

            30000

        );


    }





    stop() {


        clearInterval(

            this.interval

        );


        this.interval = null;



        Store.set(

            'online',

            {

                status:false,

                lastSeen:Date.now()

            }

        );


    }





    isOnline() {


        return (

            Store.get('online')?.status === true

        );


    }





    getLastSeen(){


        return (

            Store.get('online')?.lastSeen || null

        );


    }



}


export default new OnlineService();