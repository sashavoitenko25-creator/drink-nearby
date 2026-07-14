class TopBar {

    create() {

        const element = document.createElement('div');

        element.className = 'top-bar';

        element.innerHTML = `
            <button class="top-bar__menu">
                ☰
            </button>

            <div class="top-bar__logo">
                Компанько
            </div>

            <button class="top-bar__profile">
                👤
            </button>
        `;

        this.element = element;

        return element;

    }

    destroy() {

        this.element?.remove();

    }

}

export default TopBar;