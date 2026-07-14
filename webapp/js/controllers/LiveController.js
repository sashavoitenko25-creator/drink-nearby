/**
 * ============================================================
 * Компанько
 * Live Controller
 * ------------------------------------------------------------
 * Управляет Live режимом пользователя.
 *
 * Ответственность:
 * - запуск онлайн статуса
 * - остановка онлайн статуса
 * - контроль жизненного цикла Live режима
 *
 * Не отвечает за:
 * - карту
 * - GPS
 * - UI
 * - пользователей
 * ============================================================
 */


import OnlineService from '../services/OnlineService.js';


class LiveController {


    constructor() {


        this.started = false;


    }





    start() {


        if (this.started) {

            return;

        }



        OnlineService.start();



        this.started = true;



        console.log(

            '[Live] Mode started'

        );


    }





    stop() {


        if (!this.started) {

            return;

        }



        OnlineService.stop();



        this.started = false;



        console.log(

            '[Live] Mode stopped'

        );


    }





    isActive() {


        return this.started;


    }


}


export default new LiveController();