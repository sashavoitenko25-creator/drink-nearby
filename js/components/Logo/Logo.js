/**
 * ============================================================
 * Компанько
 * Logo Component
 * ============================================================
 */

class Logo {

    constructor() {

        this.element = null;

    }

    create() {

        const logo = document.createElement('div');

        logo.className = 'logo';

        logo.innerHTML = `
            <span class="logo__title">Компанько</span>
        `;

        this.element = logo;

        return logo;

    }

    destroy() {

        this.element?.remove();

        this.element = null;

    }

}

export default Logo;