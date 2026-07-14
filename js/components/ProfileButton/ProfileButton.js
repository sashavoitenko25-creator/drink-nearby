/**
 * ============================================================
 * Компанько
 * Profile Button
 * ============================================================
 */

import Store from '../../core/Store.js';
import EventBus, { Events } from '../../core/EventBus.js';

class ProfileButton {

    constructor() {

        this.element = null;
        this.avatar = null;
        this.unsubscribe = [];

    }

    create() {

        const button = document.createElement('button');

        button.className = 'profile-button';

        button.type = 'button';

        button.setAttribute('aria-label', 'Profile');

        button.innerHTML = `
            <img
                class="profile-button__avatar"
                alt="Avatar"
            >
        `;

        this.element = button;
        this.avatar = button.querySelector('.profile-button__avatar');

        this.bindEvents();
        this.render();
        this.subscribe();

        return button;

    }

    bindEvents() {

        this.element.addEventListener('click', () => {

            EventBus.emit(Events.OPEN_PROFILE);

        });

    }

    subscribe() {

        this.unsubscribe.push(

            EventBus.on(
                Events.STORE_UPDATED,
                () => this.render()
            )

        );

    }

    render() {

        const profile = Store.get('profile') || {};

        // Фото из Store
        let avatar = profile.avatar;

        // Если нет — пробуем взять из Telegram
        if (!avatar && window.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url) {

            avatar = window.Telegram.WebApp.initDataUnsafe.user.photo_url;

        }

        // Если нет вообще — делаем красивую заглушку
        if (!avatar) {

            const user = window.Telegram?.WebApp?.initDataUnsafe?.user;

            const letter =
                user?.first_name?.charAt(0)?.toUpperCase() ||
                profile.name?.charAt(0)?.toUpperCase() ||
                "K";

            avatar =
                `https://ui-avatars.com/api/?background=6D5DFD&color=fff&name=${encodeURIComponent(letter)}`;

        }

        this.avatar.src = avatar;

    }

    destroy() {

        this.unsubscribe.forEach(fn => fn());

        this.unsubscribe = [];

        this.element?.remove();

        this.element = null;

    }

}

export default ProfileButton;