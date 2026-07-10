// ============================================
// DRINK NEARBY
// CONFIGURATION
// Version 1.0.0
// ============================================

export const CONFIG = {

    app: {

        name: "Drink Nearby",

        version: "1.0.0",

        defaultLanguage: "en",

        supportedLanguages: [

            "en",

            "de",

            "ru",

            "uk"

        ]

    },

    map: {

        defaultCenter: [

            50.110924,

            8.682127

        ],

        defaultZoom: 14,

        minZoom: 3,

        maxZoom: 19,

        tileLayer:
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

    },

    gps: {

        enableHighAccuracy: true,

        timeout: 10000,

        maximumAge: 5000,

        updateInterval: 5000

    },

    routing: {

        profile: "walking"

    },

    ui: {

        animation: 250

    }

};