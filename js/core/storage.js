// ============================================
// STORAGE
// ============================================

export const Storage = {

    // ==========================
    // Local Storage
    // ==========================

    set(key, value) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    get(key, defaultValue = null) {

        const value = localStorage.getItem(key);

        if (value === null) {

            return defaultValue;

        }

        try {

            return JSON.parse(value);

        }

        catch {

            return defaultValue;

        }

    },

    remove(key) {

        localStorage.removeItem(key);

    },

    clear() {

        localStorage.clear();

    },

    // ==========================
    // Session Storage
    // ==========================

    sessionSet(key, value) {

        sessionStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    sessionGet(key, defaultValue = null) {

        const value = sessionStorage.getItem(key);

        if (value === null) {

            return defaultValue;

        }

        try {

            return JSON.parse(value);

        }

        catch {

            return defaultValue;

        }

    },

    sessionRemove(key) {

        sessionStorage.removeItem(key);

    }

};