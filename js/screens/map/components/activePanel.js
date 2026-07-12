// ============================================
// ACTIVE PANEL
// ============================================


export function createActivePanel(onStart){


    const panel = document.createElement("div");

    panel.className = "active-panel";


    let minutes = 60;

    let activity = "🍻 Drink";


    panel.innerHTML = `

        <div class="active-title">

            🟢 Выйти на карту

        </div>


        <div class="active-label">

            На сколько?

        </div>


        <div class="active-times">

            <button data-time="15">
                15 мин
            </button>

            <button data-time="30">
                30 мин
            </button>

            <button data-time="60" class="active-selected">
                1 час
            </button>

            <button data-time="120">
                2 часа
            </button>

        </div>


        <div class="active-label">

            Что хочешь?

        </div>


        <div class="active-types">

            <button data-type="🍻 Drink">
                🍻
            </button>

            <button data-type="☕ Coffee">
                ☕
            </button>

            <button data-type="💬 Talk">
                💬
            </button>

            <button data-type="🚶 Walk">
                🚶
            </button>

        </div>


        <button class="active-start">

            Начать

        </button>

    `;



    panel.querySelectorAll("[data-time]")
    .forEach(button=>{


        button.onclick = ()=>{


            minutes =
                Number(button.dataset.time);


            panel.querySelectorAll("[data-time]")
            .forEach(b=>
                b.classList.remove(
                    "active-selected"
                )
            );


            button.classList.add(
                "active-selected"
            );


        };


    });



    panel.querySelectorAll("[data-type]")
    .forEach(button=>{


        button.onclick = ()=>{


            activity =
                button.dataset.type;


        };


    });



    panel.querySelector(
        ".active-start"
    )
    .onclick = ()=>{


        onStart({

            minutes,

            activity

        });


    };



    return panel;

}