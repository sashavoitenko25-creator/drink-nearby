// ============================================
// ROUTE PANEL
// ============================================


export function createRoutePanel(onSelect){


    const panel =
        document.createElement("div");


    panel.className =
        "route-panel";



    panel.innerHTML = `

        <div class="route-title">

            🗺 Как добраться?

        </div>



        <div class="route-options">


            <button data-mode="foot">

                🚶
                <span>
                    Пешком
                </span>

            </button>



            <button data-mode="car">

                🚗
                <span>
                    Машина
                </span>

            </button>



            <button data-mode="bike">

                🚲
                <span>
                    Велосипед
                </span>

            </button>


        </div>

    `;



    panel
    .querySelectorAll("[data-mode]")
    .forEach(button=>{


        button.onclick = ()=>{


            onSelect(

                button.dataset.mode

            );


            panel.remove();


        };


    });



    return panel;

}