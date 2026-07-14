/**
 * ============================================================
 * Компанько
 * Application Entry Point
 * ------------------------------------------------------------
 * Главная точка входа приложения.
 *
 * Ответственность:
 * - запуск сервисов
 * - подготовка приложения
 * - запуск первого экрана
 * - уведомление о готовности
 *
 * Здесь НЕ должно быть:
 * - логики экранов
 * - логики компонентов
 * - бизнес-логики
 * ============================================================
 */

import Config from './js/core/Config.js';
import Store from './js/core/Store.js';
import EventBus, { Events } from './js/core/EventBus.js';

import LanguageService from './js/services/LanguageService.js';

import HomeController from './js/screens/Home/HomeController.js';

class App {

    constructor() {

        this.container = null;

        this.currentScreen = null;

    }

    async init() {

        try {

            console.info(
                `%c${Config.app.name} v${Config.app.version}`,
                'color:#4EA8FF;font-weight:bold;'
            );

            this.container = document.getElementById('app');

            if (!this.container) {

                throw new Error('#app container not found.');

            }

            await this.initializeServices();

            this.launch();

            Store.patch('app', {
                initialized: true
            });

            EventBus.emit(Events.APP_READY);

            console.info('Application successfully started.');

        }

        catch (error) {

            console.error(error);

            EventBus.emit(
                Events.APP_ERROR,
                error
            );

        }

    }

    /**
     * Инициализация сервисов
     */
    async initializeServices() {

        LanguageService.init();

    }

    /**
     * Запуск приложения
     */
    launch() {

        this.openHome();

    }

    /**
     * Главный экран
     */
    openHome() {

        this.destroyCurrentScreen();

        this.currentScreen = new HomeController();

        this.currentScreen.init(this.container);

    }

    /**
     * Очистка текущего экрана
     */
    destroyCurrentScreen() {

        this.currentScreen?.destroy();

        this.currentScreen = null;

    }

}

const app = new App();

window.addEventListener('DOMContentLoaded', () => {

    app.init();

});

export default app;