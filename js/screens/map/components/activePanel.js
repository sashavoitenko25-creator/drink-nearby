// ============================================
// ACTIVE PANEL
// ============================================


export function createActivePanel(onStart){


    const overlay =
        document.createElement("div");


    overlay.className =
        "active-overlay";



    const panel =
        document.createElement("div");


    panel.className =
        "active-panel";



    panel.innerHTML = `


        <div class="active-title">

            🟢 Стать видимым

        </div>



        <div class="active-subtitle">

            Люди рядом увидят тебя на карте

        </div>




        <div class="active-section">


            <div class="active-label">

                На сколько времени?

            </div>



            <div class="active-times">


                <button data-time="15">

                    15 мин

                </button>



                <button data-time="30">

                    30 мин

                </button>



                <button 
                    data-time="60"
                    class="selected"
                >

                    1 час

                </button>



                <button data-time="120">

                    2 часа

                </button>


            </div>


        </div>





        <div class="active-section">


            <div class="active-label">

                Что хочешь?

            </div>



            <div class="active-types">


                <button data-type="🍻 Drink">

                    🍻 Выпить

                </button>



                <button data-type="☕ Coffee">

                    ☕ Кофе

                </button>



                <button data-type="💬 Talk">

                    💬 Общение

                </button>



                <button data-type="🚶 Walk">

                    🚶 Прогулка

                </button>


            </div>


        </div>




        <button class="active-start">

            🟢 Показать меня на карте

        </button>




        <button class="active-close">

            Отмена

        </button>


    `;



    overlay.appendChild(panel);



    let minutes = 60;

    let activity = "🍻 Drink";



    // ============================================
    // TIME
    // ============================================


    panel
    .querySelectorAll("[data-time]")
    .forEach(button=>{


        button.onclick = ()=>{


            panel
            .querySelectorAll("[data-time]")
            .forEach(btn=>{

                btn.classList.remove(
                    "selected"
                );

            });



            button.classList.add(
                "selected"
            );



            minutes =

                Number(

                    button.dataset.time

                );


        };


    });





    // ============================================
    // TYPE
    // ============================================


    panel
    .querySelectorAll("[data-type]")
    .forEach(button=>{


        button.onclick = ()=>{


            panel
            .querySelectorAll("[data-type]")
            .forEach(btn=>{


                btn.classList.remove(
                    "selected"
                );


            });



            button.classList.add(
                "selected"
            );



            activity =

                button.dataset.type;


        };


    });






    // ============================================
    // START
    // ============================================


    panel
    .querySelector(".active-start")
    .onclick = ()=>{


        onStart({

            minutes,

            activity

        });


    };





    // ============================================
    // CLOSE
    // ============================================


    panel
    .querySelector(".active-close")
    .onclick = ()=>{


        overlay.remove();


    };




    return overlay;


}