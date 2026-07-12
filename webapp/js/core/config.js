// ============================================
// APP CONFIG
// ============================================

export const CONFIG = {

    app: {

        name: "Drink Nearby",

        version: "1.0.0",

        debug: true

    },

    supabase: {

        url: "https://YOUR_PROJECT.supabase.co",

        anonKey: "YOUR_PUBLIC_KEY"

    },

    map: {

        defaultZoom: 15,

        maxZoom: 20,

        minZoom: 3,

        updateInterval: 5000,

        defaultRadius: 5000

    },

    profile: {

        maxPhotos: 5,

        minAge: 18,

        maxAge: 99

    },

    meeting: {

        durations: [

            15,

            30,

            60,

            120

        ]

    },

    languages: [

        "en",

        "de",

        "ru",

        "uk"

    ]

};