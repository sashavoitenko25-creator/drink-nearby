/**
 * ============================================================
 * Компанько
 * Online Status Component
 * ------------------------------------------------------------
 * Отображает статус пользователя.
 *
 * Ответственность:
 * - показать онлайн состояние
 * - обновлять текст при смене языка
 *
 * Не отвечает за:
 * - управление статусом
 * - GPS
 * - сервер
 * ============================================================
 */


import EventBus, { Events } from '../../core/EventBus.js';

import { t } from '../../services/LanguageService.js';

import OnlineService from '../../services/OnlineService.js';



class OnlineStatus {


    constructor() {


        this.element = null;

        this.unsubscribe = [];


    }





    create() {


        const wrapper =
            document.createElement('div');



        wrapper.className =
            'online-status';



        wrapper.innerHTML = `

            <div class="online-status__dot"></div>

            <div class="online-status__text"></div>

        `;



        this.element = wrapper;



        this.dot =
            wrapper.querySelector(
                '.online-status__dot'
            );


        this.text =
            wrapper.querySelector(
                '.online-status__text'
            );



        this.render();



        this.subscribe();



        return wrapper;



    }





    subscribe() {



        this.unsubscribe.push(


            EventBus.on(

                Events.LANGUAGE_CHANGED,

                () => {

                    this.render();

                }

            )


        );



    }





    render() {



        const online =
            OnlineService.isOnline();



        if (online) {


            this.dot.classList.add(

                'active'

            );


        } else {


            this.dot.classList.remove(

                'active'

            );


        }




        this.text.textContent =

            t('population.online');



    }





    destroy() {



        this.unsubscribe.forEach(

            unsubscribe => unsubscribe()

        );


        this.unsubscribe = [];



        this.element?.remove();



        this.element = null;



    }



}


export default OnlineStatus;