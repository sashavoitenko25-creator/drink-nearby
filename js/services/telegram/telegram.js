// ============================================
// TELEGRAM SERVICE
// ============================================

let tg = null;

// ============================================

export function initTelegram() {

    if (!window.Telegram || !window.Telegram.WebApp) {

        console.warn("Telegram WebApp API not found.");

        return null;

    }

    tg = window.Telegram.WebApp;

    tg.ready();

    tg.expand();

    console.log("✅ Telegram initialized.");

    return tg;

}

// ============================================

export function getTelegram() {

    return tg;

}

// ============================================

export function getTelegramUser() {

    if (!tg) {

        return null;

    }

    return tg.initDataUnsafe?.user ?? null;

}

// ============================================

export function getTheme() {

    return tg?.colorScheme ?? "light";

}

// ============================================

export function getThemeParams() {

    return tg?.themeParams ?? {};

}

// ============================================

export function showAlert(text) {

    if (tg) {

        tg.showAlert(text);

    } else {

        alert(text);

    }

}

// ============================================

export function showPopup(params) {

    if (!tg) return;

    tg.showPopup(params);

}

// ============================================

export function vibrate(type = "light") {

    if (!tg?.HapticFeedback) return;

    tg.HapticFeedback.impactOccurred(type);

}

// ============================================

export function openLink(url) {

    if (tg) {

        tg.openLink(url);

    } else {

        window.open(url, "_blank");

    }

}

// ============================================

export function closeApp() {

    if (tg) {

        tg.close();

    }

}