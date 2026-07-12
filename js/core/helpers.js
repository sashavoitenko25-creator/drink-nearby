// ============================================
// HELPERS
// ============================================

// ==========================
// RANDOM ID
// ==========================

export function uuid() {

    return crypto.randomUUID();

}

// ==========================
// CLAMP
// ==========================

export function clamp(value, min, max) {

    return Math.min(

        Math.max(value, min),

        max

    );

}

// ==========================
// DELAY
// ==========================

export function delay(ms) {

    return new Promise(

        resolve => setTimeout(resolve, ms)

    );

}

// ==========================
// DISTANCE
// ==========================

export function formatDistance(meters) {

    if (meters < 1000) {

        return `${Math.round(meters)} m`;

    }

    return `${(meters / 1000).toFixed(1)} km`;

}

// ==========================
// TIME
// ==========================

export function formatMinutes(minutes) {

    if (minutes < 60) {

        return `${minutes} min`;

    }

    return `${minutes / 60} h`;

}

// ==========================
// AGE
// ==========================

export function formatAge(age) {

    return `${age}`;

}

// ==========================
// DEBOUNCE
// ==========================

export function debounce(callback, delay = 300) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(

            () => callback(...args),

            delay

        );

    };

}

// ==========================
// THROTTLE
// ==========================

export function throttle(callback, delay = 300) {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        callback(...args);

        waiting = true;

        setTimeout(

            () => waiting = false,

            delay

        );

    };

}