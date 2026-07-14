/**
 * ============================================================
 * Компанько
 * Live Sheet
 * ============================================================
 */

import EventBus, { Events } from "../../core/EventBus.js";

class LiveSheet {

    constructor() {

        this.element = null;

        this.category = null;

        this.duration = 30;

    }

    render(container = document.body) {

        this.element = document.createElement("div");

        this.element.className = "live-sheet";

        this.element.innerHTML = `

            <div class="live-sheet__backdrop"></div>

            <div class="live-sheet__panel">

                <div class="live-sheet__handle"></div>

                <div class="live-sheet__title">

                    Выйти в LIVE

                </div>

                <div class="live-sheet__categories">

                    <button data-category="drink">🍺 Выпить</button>

                    <button data-category="coffee">☕ Кофе</button>

                    <button data-category="walk">🚶 Прогулка</button>

                    <button data-category="chat">💬 Общение</button>

                    <button data-category="other">🎲 Другое</button>

                </div>

                <div class="live-sheet__times">

                    <button data-time="10">10 мин</button>

                    <button class="active" data-time="30">30 мин</button>

                    <button data-time="60">60 мин</button>

                </div>

                <button class="live-sheet__start">

                    Выйти в LIVE

                </button>

            </div>

        `;

        container.appendChild(this.element);

        this.bind();

    }

    bind() {

        this.element
            .querySelector(".live-sheet__backdrop")
            .onclick = () => this.close();

        this.element
            .querySelectorAll(".live-sheet__categories button")
            .forEach(button => {

                button.onclick = () => {

                    this.element
                        .querySelectorAll(".live-sheet__categories button")
                        .forEach(b => b.classList.remove("active"));

                    button.classList.add("active");

                    this.category = button.dataset.category;

                };

            });

        this.element
            .querySelectorAll(".live-sheet__times button")
            .forEach(button => {

                button.onclick = () => {

                    this.element
                        .querySelectorAll(".live-sheet__times button")
                        .forEach(b => b.classList.remove("active"));

                    button.classList.add("active");

                    this.duration = Number(button.dataset.time);

                };

            });

        this.element
            .querySelector(".live-sheet__start")
            .onclick = () => {

                if (!this.category) return;

                EventBus.emit(

                    Events.LIVE_START,

                    {

                        category: this.category,

                        duration: this.duration

                    }

                );

                this.close();

            };

    }

    open() {

        this.element.classList.add("open");

    }

    close() {

        this.element.classList.remove("open");

    }

    destroy() {

        this.element?.remove();

    }

}

export default LiveSheet;