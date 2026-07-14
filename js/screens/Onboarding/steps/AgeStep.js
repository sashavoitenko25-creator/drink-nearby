/**
 * ============================================================
 * Компанько
 * Age Step
 * ============================================================
 */

class AgeStep {

    constructor(controller) {

        this.controller = controller;

        this.age = 18;

    }

    render() {

        const element = document.createElement("div");

        element.className = "onboarding-step age-step";

        element.innerHTML = `

            <div class="age-step__title">

                Сколько вам лет?

            </div>

            <div class="age-step__subtitle">

                Вам должно быть не менее 18 лет.

            </div>

            <div class="age-selector">

                <button class="age-selector__button minus">

                    −

                </button>

                <input
                    class="age-selector__value"
                    type="number"
                    min="18"
                    max="99"
                    value="18"
                >

                <button class="age-selector__button plus">

                    +

                </button>

            </div>

            <button
                class="age-step__next"
            >

                Далее →

            </button>

        `;

        const input = element.querySelector(".age-selector__value");

        const minus = element.querySelector(".minus");

        const plus = element.querySelector(".plus");

        const update = () => {

            let value = Number(input.value);

            if (isNaN(value)) value = 18;

            if (value < 18) value = 18;

            if (value > 99) value = 99;

            input.value = value;

            this.age = value;

            this.controller.updateProfile({

                age: value

            });

        };

        minus.addEventListener("click", () => {

            input.value = Number(input.value) - 1;

            update();

        });

        plus.addEventListener("click", () => {

            input.value = Number(input.value) + 1;

            update();

        });

        input.addEventListener("input", update);

        update();

        element
            .querySelector(".age-step__next")
            .addEventListener("click", () => {

                this.controller.next();

            });

        return element;

    }

}

export default AgeStep;