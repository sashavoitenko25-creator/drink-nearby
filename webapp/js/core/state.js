// ============================================
// GLOBAL APPLICATION STATE
// ============================================

export const state = {

    // Telegram

    telegram: null,

    // Current user

    user: null,

    profile: null,

    // Current screen

    screen: null,

    // Language

    language: "en",

    // GPS

    location: {

        latitude: null,

        longitude: null,

        accuracy: null,

        permission: false

    },

    // Map

    map: {

        instance: null,

        marker: null,

        markers: []

    },

    // Nearby users

    activeUsers: [],

    // UI

    ui: {

        loading: false,

        modal: null,

        toast: null

    }

};

// ============================================

export function setState(key, value) {

    state[key] = value;

}

// ============================================

export function getState(key) {

    return state[key];

}