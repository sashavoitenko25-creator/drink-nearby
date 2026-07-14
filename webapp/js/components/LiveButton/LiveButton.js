/**
 * ============================================================
 * Компанько
 * Live Button Component
 * ------------------------------------------------------------
 * Главная кнопка открытия Live режима.
 *
 * Ответственность:
 * - отображение кнопки
 * - открытие LiveSheet
 *
 * Не отвечает за:
 * - запуск Live режима
 * - таймер
 * - GPS
 * - карту
 * ============================================================
 */


class LiveButton {


    constructor() {

        this.element = null;

    }





    create() {


        const button = document.createElement("button");


        button.className = "live-button";


        button.type = "button";



        button.innerHTML = `

            <span class="live-button__text">

                LIVE

            </span>

        `;



        this.element = button;



        return button;


    }






    onClick(callback) {


        if(!this.element){

            return;

        }



        this.element.addEventListener(

            "click",

            callback

        );


    }






    setActive(active){


        if(!this.element){

            return;

        }



        this.element.classList.toggle(

            "active",

            active

        );


    }






    destroy(){


        this.element?.remove();


        this.element = null;


    }


}



export default LiveButton;