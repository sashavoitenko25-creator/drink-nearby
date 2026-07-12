// ============================================
// I18N
// ============================================

import { Storage } from "./storage.js";
import { CONFIG } from "./config.js";

let currentLanguage = CONFIG.languages[0];
let dictionary = {};

// ============================================
// INIT
// ============================================

export async function initI18n() {

    currentLanguage = Storage.get(
        "language",
        CONFIG.languages[0]
    );

    await loadLanguage(currentLanguage);

    console.log(`🌍 Language: ${currentLanguage}`);

}

// ============================================
// LOAD LANGUAGE
// ============================================

export async function loadLanguage(language) {

    const response = await fetch(
        `./lang/${language}/common.json`
    );

    dictionary = await response.json();

}

// ============================================
// CHANGE LANGUAGE
// ============================================

export async function setLanguage(language) {

    if (!CONFIG.languages.includes(language)) {

        return;

    }

    currentLanguage = language;

    Storage.set(
        "language",
        language
    );

    await loadLanguage(language);

    document.dispatchEvent(
        new CustomEvent(
            "languageChanged"
        )
    );

}

// ============================================
// GET TEXT
// ============================================

export function t(key) {

    return dictionary[key] ?? key;

}

// ============================================

export function getCurrentLanguage() {

    return currentLanguage;

}