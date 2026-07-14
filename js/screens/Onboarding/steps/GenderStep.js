/**
 * ============================================================
 * Компанько
 * Gender Step
 * ============================================================
 */

class GenderStep {

    constructor(controller) {

        this.controller = controller;

        this.selected = null;

    }

    render() {

        const element = document.createElement("div");

        element.className = "onboarding-step gender-step";

        element.innerHTML = `

            <div class="gender-step__title">

                Ваш пол

            </div>

            <div class="gender-step__subtitle">

                Это поможет лучше подбирать знакомства.

            </div>

            <div class="gender-list">

                <div
                    class="gender-card"
                    data-gender="male"
                >

                    <div class="gender-card__icon">

                        👨

                    </div>

                    <div class="gender-card__title">

                        Мужчина

                    </div>

                </div>

                <div
                    class="gender-card"
                    data-gender="female"
                >

                    <div class="gender-card__icon">

                        👩

                    </div>

                    <div class="gender-card__title">

                        Женщина

                    </div>

                </div>

            </div>

            <button
                class="gender-step__next"
                disabled
            >

                Далее →

            </button>

        `;

        const cards = element.querySelectorAll(".gender-card");
        const next = element.querySelector(".gender-step__next");

        cards.forEach(card => {

            card.addEventListener("click", () => {

                cards.forEach(c =>
                    c.classList.remove("active")
                );

                card.classList.add("active");

                this.selected = card.dataset.gender;

                this.controller.updateProfile({

                    gender: this.selected

                });

                next.disabled = false;

            });

        });

        next.addEventListener("click", () => {

            this.controller.next();

        });

        return element;

    }

}

export default GenderStep;