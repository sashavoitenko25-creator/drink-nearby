/**
 * ============================================================
 * Компанько
 * Name Step
 * ============================================================
 */

class NameStep {

    constructor(controller) {

        this.controller = controller;

    }

    render() {

        const element = document.createElement("div");

        element.className = "onboarding-step name-step";

        element.innerHTML = `

            <div class="name-step__title">

                Как вас зовут?

            </div>

            <div class="name-step__subtitle">

                Это имя увидят другие пользователи.

            </div>

            <input
                class="name-step__input"
                type="text"
                maxlength="20"
                placeholder="Введите имя"
            >

            <div class="name-step__counter">

                0 / 20

            </div>

            <button
                class="name-step__next"
                disabled
            >

                Далее →

            </button>

        `;

        const input = element.querySelector(".name-step__input");

        const counter = element.querySelector(".name-step__counter");

        const button = element.querySelector(".name-step__next");

        input.focus();

        input.addEventListener("input", () => {

            const value = input.value.trim();

            counter.textContent = `${value.length} / 20`;

            if (value.length >= 2) {

                button.disabled = false;

                this.controller.updateProfile({

                    name: value

                });

            } else {

                button.disabled = true;

            }

        });

        button.addEventListener("click", () => {

            this.controller.next();

        });

        return element;

    }

}

export default NameStep;