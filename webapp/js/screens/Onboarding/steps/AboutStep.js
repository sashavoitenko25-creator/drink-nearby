/**
 * ============================================================
 * Компанько
 * About Step
 * ============================================================
 */

class AboutStep {

    constructor(controller) {

        this.controller = controller;

    }

    render() {

        const element = document.createElement("div");

        element.className = "onboarding-step about-step";

        element.innerHTML = `

            <div class="about-step__title">

                Расскажите немного о себе

            </div>

            <div class="about-step__subtitle">

                Это поможет людям понять,
                с кем они хотят познакомиться.

            </div>

            <div class="about-tags">

                <button class="about-tag">
                    ☕ Люблю кофе
                </button>

                <button class="about-tag">
                    🍺 Ищу компанию на вечер
                </button>

                <button class="about-tag">
                    🚶 Люблю прогулки
                </button>

                <button class="about-tag">
                    🎲 Всегда за новые знакомства
                </button>

            </div>

            <textarea
                class="about-text"
                maxlength="200"
                placeholder="Напишите несколько слов о себе..."
            ></textarea>

            <div class="about-counter">

                0 / 200

            </div>

            <button
                class="about-next"
            >

                Далее →

            </button>

        `;

        const textarea = element.querySelector(".about-text");
        const counter = element.querySelector(".about-counter");

        textarea.addEventListener("input", () => {

            const value = textarea.value;

            counter.textContent = `${value.length} / 200`;

            this.controller.updateProfile({

                about: value.trim()

            });

        });

        element.querySelectorAll(".about-tag").forEach(tag => {

            tag.addEventListener("click", () => {

                textarea.value = tag.textContent.trim();

                textarea.dispatchEvent(new Event("input"));

                textarea.focus();

            });

        });

        element
            .querySelector(".about-next")
            .addEventListener("click", () => {

                this.controller.next();

            });

        return element;

    }

}

export default AboutStep;