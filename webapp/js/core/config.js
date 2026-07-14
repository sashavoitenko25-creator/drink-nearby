/**
 * ============================================================
 * Компанько
 * Global Configuration
 * ------------------------------------------------------------
 * Единый источник конфигурации приложения.
 *
 * ВАЖНО:
 * - Не хранить здесь состояние приложения.
 * - Не изменять значения во время выполнения.
 * - Все настройки читаются только отсюда.
 * ============================================================
 */

const Config = Object.freeze({

    /**
     * --------------------------------------------------------
     * Application
     * --------------------------------------------------------
     */
    app: Object.freeze({
        name: 'Компанько',
        version: '1.0.0',
        environment: 'development' // development | production
    }),

    /**
     * --------------------------------------------------------
     * API
     * --------------------------------------------------------
     */
    api: Object.freeze({
        baseUrl: '',
        timeout: 10000
    }),

    /**
     * --------------------------------------------------------
     * Telegram Mini App
     * --------------------------------------------------------
     */
    telegram: Object.freeze({
        enabled: true
    }),

    /**
     * --------------------------------------------------------
     * Localization
     * --------------------------------------------------------
     */
    localization: Object.freeze({

        defaultLanguage: 'uk',

        supportedLanguages: Object.freeze([
            'uk',
            'ru',
            'en'
        ])

    }),

    /**
     * --------------------------------------------------------
     * Theme
     * --------------------------------------------------------
     */
    theme: Object.freeze({

        defaultTheme: 'dark',

        supportedThemes: Object.freeze([
            'dark',
            'light'
        ])

    }),

    /**
     * --------------------------------------------------------
     * Map
     * --------------------------------------------------------
     */
    map: Object.freeze({

        defaultZoom: 15,

        minZoom: 4,

        maxZoom: 20,

        animationDuration: 500,

        updateInterval: 5000,

        routeColor: '#4EA8FF',

        userMarkerSize: 42,

        nearbyRadius: 5000

    }),

    /**
     * --------------------------------------------------------
     * LIVE Mode
     * --------------------------------------------------------
     */
    live: Object.freeze({

        defaultDuration: 30,

        minDuration: 15,

        maxDuration: 60,

        availableDurations: Object.freeze([
            15,
            30,
            45,
            60
        ])

    }),

    /**
     * --------------------------------------------------------
     * Activities
     * --------------------------------------------------------
     */
    activities: Object.freeze({

        drink: 'drink',

        coffee: 'coffee',

        walk: 'walk',

        chat: 'chat'

    }),

    /**
     * --------------------------------------------------------
     * Population Widget
     * --------------------------------------------------------
     */
    population: Object.freeze({

        enabled: true,

        refreshInterval: 10000

    }),

    /**
     * --------------------------------------------------------
     * Events
     * --------------------------------------------------------
     */
    events: Object.freeze({

        enabled: true,

        refreshInterval: 15000

    }),

    /**
     * --------------------------------------------------------
     * Animation
     * --------------------------------------------------------
     */
    animation: Object.freeze({

        duration: 300,

        markerMoveDuration: 1000,

        rippleDuration: 1200

    }),

    /**
     * --------------------------------------------------------
     * Storage Keys
     * --------------------------------------------------------
     */
    storage: Object.freeze({

        language: 'kompanko.language',

        theme: 'kompanko.theme',

        user: 'kompanko.user'

    })

});

export default Config;