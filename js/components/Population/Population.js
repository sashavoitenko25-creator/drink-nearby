/**
 * ============================================================
 * Компанько
 * Population Widget
 * ------------------------------------------------------------
 * Отображает количество пользователей онлайн.
 *
 * Ответственность:
 * - отображение количества онлайн
 * - обновление при изменении Store
 * - обновление при смене языка
 * ============================================================
 */

import Store from '../../core/Store.js';
import EventBus, { Events } from '../../core/EventBus.js';
import { t } from '../../services/LanguageService.js';

class Population {

    constructor() {

        this.element = null;
        this.label = null;
        this.value = null;

        this.unsubscribe = [];

    }

    create() {

        const widget = document.createElement('div');

        widget.className = 'population';

        widget.innerHTML = `
            <div class="population__label">
                <span class="population__dot"></span>
                <span class="population__text"></span>
            </div>

            <div class="population__value"></div>
        `;

        this.element = widget;

        this.label = widget.querySelector('.population__text');
        this.value = widget.querySelector('.population__value');

        this.render();

        this.subscribe();

        return widget;

    }

    subscribe() {

        this.unsubscribe.push(
            EventBus.on(
                Events.STORE_UPDATED,
                () => this.render()
            )
        );

        this.unsubscribe.push(
            EventBus.on(
                Events.LANGUAGE_CHANGED,
                () => this.render()
            )
        );

    }

    render() {

        const online = Store.get('population.online') ?? 0;

        this.label.textContent = t('population.online');

        this.value.textContent = `${online} ${t('population.people')}`;

    }

    destroy() {

        this.unsubscribe.forEach(unsubscribe => unsubscribe());

        this.unsubscribe = [];

        this.element?.remove();

        this.element = null;

    }

}

export default Population;