/**
 * ============================================================
 * Компанько
 * Event Bus
 * ------------------------------------------------------------
 * Центральная система обмена событиями приложения.
 *
 * Любой компонент может:
 * - подписаться на событие
 * - отписаться
 * - отправить событие
 *
 * Компоненты никогда не должны обращаться друг к другу напрямую.
 * ============================================================
 */

class EventBus {

    constructor() {

        this.events = new Map();

    }

    /**
     * Подписка
     */
    on(eventName, callback) {

        if (!this.events.has(eventName)) {

            this.events.set(eventName, new Set());

        }

        this.events.get(eventName).add(callback);

        return () => this.off(eventName, callback);

    }

    /**
     * Подписка один раз
     */
    once(eventName, callback) {

        const unsubscribe = this.on(eventName, (...args) => {

            unsubscribe();

            callback(...args);

        });

    }

    /**
     * Отписка
     */
    off(eventName, callback) {

        if (!this.events.has(eventName)) {

            return;

        }

        this.events.get(eventName).delete(callback);

        if (this.events.get(eventName).size === 0) {

            this.events.delete(eventName);

        }

    }

    /**
     * Отправка события
     */
    emit(eventName, payload = null) {

        if (!eventName) {

            console.warn('[EventBus] Attempt to emit event without name.');

            return;

        }

        if (!this.events.has(eventName)) {

            return;

        }

        this.events.get(eventName).forEach(callback => {

            try {

                callback(payload);

            }

            catch (error) {

                console.error(

                    `[EventBus] Error in "${eventName}" listener`,

                    error

                );

            }

        });

    }

    /**
     * Проверка существования события
     */
    has(eventName) {

        return this.events.has(eventName);

    }

    /**
     * Очистить событие
     */
    clear(eventName) {

        this.events.delete(eventName);

    }

    /**
     * Полностью очистить EventBus
     */
    clearAll() {

        this.events.clear();

    }

}

const eventBus = new EventBus();

/**
 * ============================================================
 * Список событий приложения
 * ============================================================
 */

export const Events = Object.freeze({

    /**
     * App
     */
    APP_READY: 'app:ready',

    APP_ERROR: 'app:error',

    /**
     * User
     */
    USER_UPDATED: 'user:updated',

    USER_LOCATION_CHANGED: 'user:location:changed',

    LOCATION_UPDATED: 'location:updated',

    LOCATION_ERROR: 'location:error',

    /**
     * Language
     */
    LANGUAGE_CHANGED: 'language:changed',

    /**
     * Theme
     */
    THEME_CHANGED: 'theme:changed',

    /**
     * Store
     */
    STORE_UPDATED: 'store:updated',

    /**
     * Map
     */
    MAP_READY: 'map:ready',

    MAP_MOVED: 'map:moved',

    MAP_ZOOM_CHANGED: 'map:zoom:changed',

    /**
     * LIVE
     */
    LIVE_STARTED: 'live:started',

    LIVE_UPDATED: 'live:updated',

    LIVE_STOPPED: 'live:stopped',

    LIVE_TIMER_UPDATED: 'live:timer:updated',

    /**
     * Users
     */
    USERS_UPDATED: 'users:updated',

    USER_SELECTED: 'user:selected',

    USER_DESELECTED: 'user:deselected',

    /**
     * Population
     */
    POPULATION_UPDATED: 'population:updated',

    /**
     * Events
     */
    EVENTS_UPDATED: 'events:updated',

    EVENT_SELECTED: 'event:selected',

    /**
     * Route
     */
    ROUTE_CREATED: 'route:created',

    ROUTE_REMOVED: 'route:removed'

});

export default eventBus;