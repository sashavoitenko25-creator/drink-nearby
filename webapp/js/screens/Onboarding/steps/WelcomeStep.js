/**
 * ============================================================
 * Компанько
 * Welcome Step
 * ============================================================
 */

class WelcomeStep {

    constructor(controller) {

        this.controller = controller;

    }

    render() {

        const element = document.createElement("div");

        element.className = "onboarding-step welcome-step";

        element.innerHTML = `

            <div class="welcome-step__logo">

                Компанько

            </div>

            <div class="welcome-step__title">

                Добро пожаловать 👋

            </div>

            <div class="welcome-step__text">

                Создайте профиль один раз,
                чтобы люди рядом могли найти вас.

            </div>

            <button
                class="welcome-step__button"
            >

                Начать →

            </button>

        `;

        element
            .querySelector(".welcome-step__button")
            .addEventListener("click", () => {

                this.controller.next();

            });

        return element;

    }

}

export default WelcomeStep;