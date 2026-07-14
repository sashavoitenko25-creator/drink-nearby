/**
 * ============================================================
 * Компанько
 * Global Store
 * ------------------------------------------------------------
 * Единое хранилище состояния приложения.
 *
 * Правила:
 * - Компоненты НЕ изменяют состояние напрямую.
 * - Все изменения проходят через Store.
 * - Любой компонент может подписаться на изменения.
 * ============================================================
 */

class Store {

    constructor() {

        this.state = {

            app: {

                initialized: false

            },

            user: {

                id: null,

                name: '',

                age: null,

                avatar: '',

                city: '',

                bio: '',

                interests: [],

                favoriteActivity: null

            },

            location: {

                latitude: null,

                longitude: null,

                accuracy: null,

                heading: null,

                speed: null

            },

            language: 'uk',

            theme: 'dark',

            map: {

                zoom: null,

                center: null,

                ready: false

            },

            live: {

                active: false,

                activity: null,

                duration: null,

                expiresAt: null

            },

            filters: {

                activities: []

            },

            users: [],

            selectedUser: null,

            population: {

                online: 0

            },

            events: [],

            route: {

                active: false,

                destination: null,

                distance: null,

                duration: null

            }

        };

        this.listeners = new Set();

    }

    /**
     * Получить всё состояние
     */
    getState() {

        return structuredClone(this.state);

    }

    /**
     * Получить раздел состояния
     */
    get(key) {

        return structuredClone(this.state[key]);

    }

    /**
     * Изменить раздел состояния
     */
    set(key, value) {

        if (!(key in this.state)) {

            console.warn(`[Store] Unknown state key: "${key}"`);

            return;

        }

        this.state[key] = value;

        this.notify();

    }

    /**
     * Частичное обновление объекта
     */
    patch(key, data) {

        if (!(key in this.state)) {

            console.warn(`[Store] Unknown state key: "${key}"`);

            return;

        }

        if (typeof this.state[key] !== 'object') {

            console.warn(`[Store] "${key}" is not an object`);

            return;

        }

        this.state[key] = {

            ...this.state[key],

            ...data

        };

        this.notify();

    }

    /**
     * Сброс раздела
     */
    reset(key, value) {

        this.state[key] = structuredClone(value);

        this.notify();

    }

    /**
     * Подписка
     */
    subscribe(callback) {

        this.listeners.add(callback);

        return () => {

            this.listeners.delete(callback);

        };

    }

    /**
     * Уведомление подписчиков
     */
    notify() {

        const snapshot = this.getState();

        this.listeners.forEach(listener => {

            try {

                listener(snapshot);

            }

            catch (error) {

                console.error('[Store]', error);

            }

        });

    }

}

const store = new Store();

export default store;