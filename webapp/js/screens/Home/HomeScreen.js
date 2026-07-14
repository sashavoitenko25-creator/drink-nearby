/**
 * ============================================================
 * Компанько
 * Home Screen
 * ------------------------------------------------------------
 * Основная структура Home экрана.
 *
 * Ответственность:
 * - создание областей экрана
 * - размещение регионов
 *
 * Не отвечает за:
 * - данные
 * - карту
 * - состояние пользователя
 * ============================================================
 */


class HomeScreen {


    constructor() {


        this.element = null;

        this.regions = {};

    }





    render(container) {



        const wrapper =
            document.createElement('div');



        wrapper.className =
            'home-screen';



        wrapper.innerHTML = `

            <header class="home-screen__header"></header>


            <main class="home-screen__content"></main>


            <footer class="home-screen__bottom"></footer>


        `;



        this.element = wrapper;



        this.regions.header =
            wrapper.querySelector(
                '.home-screen__header'
            );


        this.regions.content =
            wrapper.querySelector(
                '.home-screen__content'
            );


        this.regions.bottom =
            wrapper.querySelector(
                '.home-screen__bottom'
            );



        container.appendChild(wrapper);



    }





    getRegion(name) {


        return this.regions[name];


    }





    destroy(){


        this.element?.remove();


        this.element = null;


        this.regions = {};


    }



}


export default HomeScreen;