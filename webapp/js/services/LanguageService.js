/**
 * ============================================================
 * Компанько
 * Language Service
 * ------------------------------------------------------------
 * Управляет локализацией приложения.
 *
 * Возможности:
 * - автоматическое определение языка Telegram
 * - загрузка перевода
 * - переключение языка
 * - сохранение выбора пользователя
 * - уведомление компонентов
 * ============================================================
 */

import Config from '../core/Config.js';
import Store from '../core/Store.js';
import EventBus, { Events } from '../core/EventBus.js';
import locales, { hasLocale } from '../locales/index.js';

class LanguageService {

    constructor() {

        this.language = Config.localization.defaultLanguage;

    }

    /**
     * Инициализация сервиса
     */
    init() {

        let language = null;

        // 1. LocalStorage
        language = localStorage.getItem(Config.storage.language);

        // 2. Telegram language_code
        if (!language && window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code) {

            language = window.Telegram.WebApp.initDataUnsafe.user.language_code;

        }

        // 3. Default
        if (!language) {

            language = Config.localization.defaultLanguage;

        }

        this.setLanguage(language);

    }

    /**
     * Получить текущий язык
     */
    getLanguage() {

        return this.language;

    }

    /**
     * Получить словарь
     */
    getLocale() {

        return locales[this.language];

    }

    /**
     * Получить перевод
     *
     * Пример:
     * t("profile.city")
     */
    t(path) {

        const keys = path.split('.');

        let value = this.getLocale();

        for (const key of keys) {

            value = value?.[key];

            if (value === undefined) {

                console.warn(`[Language] Missing key "${path}"`);

                return path;

            }

        }

        return value;

    }

    /**
     * Изменить язык
     */
    setLanguage(language) {

        if (!hasLocale(language)) {

            language = Config.localization.defaultLanguage;

        }

        this.language = language;

        localStorage.setItem(
            Config.storage.language,
            language
        );

        Store.set('language', language);

        EventBus.emit(
            Events.LANGUAGE_CHANGED,
            language
        );

    }

}

const languageService = new LanguageService();

/**
 * Удобный доступ:
 *
 * t("profile.city")
 */
export const t = (path) => languageService.t(path);

export default languageService;