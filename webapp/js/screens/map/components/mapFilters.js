// ============================================
// MAP FILTERS
// ============================================


export function createMapFilters(onChange){


    const container =
        document.createElement("div");


    container.className =
        "map-filters";



    container.innerHTML = `

        <button data-type="all">

            Все

        </button>


        <button data-type="🍻">

            🍻 Выпить

        </button>


        <button data-type="☕">

            ☕ Кофе

        </button>


        <button data-type="💬">

            💬 Общение

        </button>


        <button data-type="🚶">

            🚶 Прогулка

        </button>

    `;



    container
    .querySelectorAll("button")
    .forEach(button=>{


        button.onclick = ()=>{


            container
            .querySelectorAll("button")
            .forEach(btn=>{


                btn.classList.remove(

                    "active"

                );


            });



            button.classList.add(

                "active"

            );



            onChange(

                button.dataset.type

            );


        };


    });



    container
    .querySelector(

        '[data-type="all"]'

    )
    .classList.add(

        "active"

    );



    return container;

}