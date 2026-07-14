/**
 * ============================================================
 * Компанько
 * Photo Step
 * ============================================================
 */

class PhotoStep {

    constructor(controller) {

        this.controller = controller;

    }

    render() {

        const element = document.createElement("div");

        element.className = "onboarding-step photo-step";

        element.innerHTML = `

            <div class="photo-step__title">

                Добавьте фотографию

            </div>

            <div class="photo-step__subtitle">

                Люди чаще знакомятся,
                когда видят настоящее фото.

            </div>

            <label class="photo-picker">

                <input
                    type="file"
                    accept="image/*"
                    class="photo-picker__input"
                >

                <img
                    class="photo-picker__preview"
                    src="https://placehold.co/160x160/202938/FFFFFF?text=%2B"
                >

            </label>

            <button class="photo-step__next">

                Далее →

            </button>

            <button class="photo-step__skip">

                Пропустить

            </button>

        `;

        const input = element.querySelector(".photo-picker__input");

        const preview = element.querySelector(".photo-picker__preview");

        input.addEventListener("change", () => {

            const file = input.files[0];

            if (!file) return;

            const reader = new FileReader();

            reader.onload = () => {

                preview.src = reader.result;

                this.controller.updateProfile({

                    photo: reader.result

                });

            };

            reader.readAsDataURL(file);

        });

        element
            .querySelector(".photo-step__next")
            .addEventListener("click", () => {

                this.controller.next();

            });

        element
            .querySelector(".photo-step__skip")
            .addEventListener("click", () => {

                this.controller.next();

            });

        return element;

    }

}

export default PhotoStep;