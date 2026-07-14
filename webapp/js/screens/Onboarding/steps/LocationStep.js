/**
 * ============================================================
 * Компанько
 * Location Step
 * ============================================================
 */

import LocationService from "../../../services/LocationService.js";

class LocationStep {

    constructor(controller) {

        this.controller = controller;

    }

    render() {

        const element = document.createElement("div");

        element.className = "onboarding-step location-step";

        element.innerHTML = `

            <div class="location-step__icon">

                📍

            </div>

            <div class="location-step__title">

                Разрешите доступ к геолокации

            </div>

            <div class="location-step__subtitle">

                Компанько показывает людей,
                которые находятся рядом.

                <br><br>

                Мы используем геолокацию
                только во время работы приложения.

            </div>

            <button class="location-step__allow">

                Разрешить доступ

            </button>

            <button class="location-step__skip">

                Пока не сейчас

            </button>

        `;

        const allow = element.querySelector(".location-step__allow");

        const skip = element.querySelector(".location-step__skip");

        allow.addEventListener("click", async () => {

            allow.disabled = true;

            allow.textContent = "Получаем геолокацию...";

            try {

                await LocationService.getCurrentPosition();

                this.controller.updateProfile({

                    locationAllowed: true

                });

            } catch (e) {

                console.warn(e);

                this.controller.updateProfile({

                    locationAllowed: false

                });

            }

            this.controller.finish();

        });

        skip.addEventListener("click", () => {

            this.controller.updateProfile({

                locationAllowed: false

            });

            this.controller.finish();

        });

        return element;

    }

}

export default LocationStep;