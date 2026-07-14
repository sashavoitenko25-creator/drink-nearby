/**
 * ============================================================
 * Компанько
 * Header
 * ------------------------------------------------------------
 * Контейнер верхней панели приложения.
 *
 * Ответственность:
 * - расположение внутренних компонентов;
 * - создание DOM Header;
 * - предоставление областей для компонентов.
 *
 * Не содержит бизнес-логики.
 * ============================================================
 */

class Header {

    constructor() {

        this.element = null;

        this.refs = {};

    }

    create() {

        const header = document.createElement('header');

        header.className = 'header';

        header.innerHTML = `

            <div class="header__left"></div>

            <div class="header__right"></div>

        `;

        this.refs = {

            left: header.querySelector('.header__left'),

            right: header.querySelector('.header__right')

        };

        this.element = header;

        return header;

    }

    render(container) {

        if (!this.element) {

            this.create();

        }

        container.appendChild(this.element);

    }

    getRegion(name) {

        return this.refs[name] || null;

    }

    destroy() {

        this.element?.remove();

        this.element = null;

        this.refs = {};

    }

}

export default Header;