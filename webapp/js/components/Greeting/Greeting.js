/**
 * ============================================================
 * Компанько
 * Greeting Component
 * ------------------------------------------------------------
 * Отображает приветствие пользователя.
 *
 * Ответственность:
 * - приветствие по времени суток
 * - имя пользователя
 * - обновление языка
 * ============================================================
 */

import Store from '../../core/Store.js';
import EventBus, { Events } from '../../core/EventBus.js';
import { t } from '../../services/LanguageService.js';

class Greeting {

    constructor() {

        this.element = null;

        this.unsubscribe = [];

    }

    create() {

        const wrapper = document.createElement('div');

        wrapper.className = 'greeting';

        wrapper.innerHTML = `
            <div class="greeting__title"></div>
            <div class="greeting__subtitle"></div>
        `;

        this.element = wrapper;

        this.title = wrapper.querySelector('.greeting__title');
        this.subtitle = wrapper.querySelector('.greeting__subtitle');

        this.render();

        this.subscribe();

        return wrapper;

    }

    subscribe() {

        this.unsubscribe.push(

            EventBus.on(
                Events.LANGUAGE_CHANGED,
                () => this.render()
            )

        );

        this.unsubscribe.push(

            EventBus.on(
                Events.STORE_UPDATED,
                () => this.render()
            )

        );

    }

    getGreeting() {

        const hour = new Date().getHours();

        if (hour < 5) {
            return t('greeting.night');
        }

        if (hour < 12) {
            return t('greeting.morning');
        }

        if (hour < 18) {
            return t('greeting.day');
        }

        return t('greeting.evening');

    }

    render() {

        const profile = Store.get('profile') || {};

        const name = profile.name || 'Guest';

        this.title.textContent = this.getGreeting();

        this.subtitle.textContent = name;

    }

    destroy() {

        this.unsubscribe.forEach(unsubscribe => unsubscribe());

        this.unsubscribe = [];

        this.element?.remove();

        this.element = null;

    }

}

export default Greeting;