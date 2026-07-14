/**
 * ============================================================
 * Компанько
 * Profile Card Component
 * ------------------------------------------------------------
 * Карточка текущего пользователя в Live режиме.
 *
 * Ответственность:
 * - отображение профиля
 * - статус онлайн
 * - текущая активность
 *
 * Не отвечает за:
 * - получение GPS
 * - карту
 * - сохранение данных
 * ============================================================
 */


import Store from '../../core/Store.js';

import EventBus, { Events } from '../../core/EventBus.js';

import { t } from '../../services/LanguageService.js';



class ProfileCard {


    constructor() {


        this.element = null;

        this.unsubscribe = [];


    }





    create() {


        const wrapper =
            document.createElement('div');



        wrapper.className =
            'profile-card';



        wrapper.innerHTML = `

            <div class="profile-card__avatar">

                👤

            </div>


            <div class="profile-card__info">


                <div class="profile-card__name"></div>


                <div class="profile-card__status">

                    <span class="profile-card__dot"></span>

                    <span class="profile-card__online"></span>

                </div>


                <div class="profile-card__activity">

                    🚶 <span></span>

                    <br>

                    📍 <span class="distance"></span>

                </div>


            </div>



        `;



        this.element = wrapper;



        this.name =
            wrapper.querySelector(
                '.profile-card__name'
            );


        this.online =
            wrapper.querySelector(
                '.profile-card__online'
            );


        this.activity =
            wrapper.querySelector(
                '.profile-card__activity span'
            );


        this.distance =
            wrapper.querySelector(
                '.distance'
            );



        this.render();



        this.subscribe();



        return wrapper;



    }





    subscribe(){



        this.unsubscribe.push(


            EventBus.on(

                Events.STORE_UPDATED,

                () => this.render()

            )


        );


    }





    render(){



        const profile =
            Store.get('profile') || {};



        this.name.textContent =

            `${profile.name || 'Guest'}, ${profile.age || ''}`;



        this.online.textContent =

            t('population.online');



        this.activity.textContent =

            'Прогулка';



        this.distance.textContent =

            '250 м';



    }





    destroy(){



        this.unsubscribe.forEach(

            unsubscribe => unsubscribe()

        );



        this.unsubscribe = [];



        this.element?.remove();


        this.element = null;


    }


}


export default ProfileCard;