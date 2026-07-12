// ============================================
// ROUTE PANEL 2.0
// ============================================


export function createRoutePanel(onSelect){


    const overlay =

        document.createElement("div");



    overlay.className =

        "route-overlay";




    const panel =

        document.createElement("div");



    panel.className =

        "route-panel";





    panel.innerHTML = `



        <button class="route-close">

            ✕

        </button>




        <div class="route-title">


            🧭 Как добраться?


        </div>




        <div class="route-subtitle">


            Выберите способ передвижения


        </div>





        <div class="route-options">





            <button 
                class="route-option"
                data-mode="walking"
            >


                <div class="route-icon">

                    🚶

                </div>


                <div>


                    <div class="route-name">

                        Пешком

                    </div>


                    <div class="route-description">

                        Самый простой путь

                    </div>


                </div>


            </button>








            <button 
                class="route-option"
                data-mode="cycling"
            >


                <div class="route-icon">

                    🚲

                </div>


                <div>


                    <div class="route-name">

                        Велосипед

                    </div>


                    <div class="route-description">

                        Быстрее пешком

                    </div>


                </div>


            </button>









            <button 
                class="route-option"
                data-mode="driving"
            >


                <div class="route-icon">

                    🚗

                </div>


                <div>


                    <div class="route-name">

                        Машина

                    </div>


                    <div class="route-description">

                        Если рядом дорога

                    </div>


                </div>


            </button>





        </div>



    `;




    overlay.appendChild(panel);





    // CLOSE


    panel
    .querySelector(".route-close")
    .onclick = ()=>{


        overlay.remove();


    };





    // SELECT


    panel
    .querySelectorAll(".route-option")
    .forEach(button=>{


        button.onclick = ()=>{


            const mode =

                button.dataset.mode;



            overlay.remove();



            onSelect(

                mode

            );


        };


    });





    return overlay;


}