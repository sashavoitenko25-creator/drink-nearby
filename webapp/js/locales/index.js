/**
 * ============================================================
 * Компанько
 * Localization Registry
 * ------------------------------------------------------------
 * Единая точка доступа ко всем локализациям приложения.
 *
 * ВАЖНО:
 * - Все модули импортируют локализацию только отсюда.
 * - Не импортировать uk.js / ru.js / en.js напрямую.
 * ============================================================
 */

import uk from './uk.js';
import ru from './ru.js';
import en from './en.js';

/**
 * Все словари приложения
 */
const locales = Object.freeze({

    uk,

    ru,

    en

});

/**
 * Получить словарь языка
 *
 * Если язык не найден —
 * возвращается украинская локализация.
 */
export function getLocale(language) {

    return locales[language] || locales.uk;

}

/**
 * Проверка поддержки языка
 */
export function hasLocale(language) {

    return Object.prototype.hasOwnProperty.call(locales, language);

}

/**
 * Список поддерживаемых языков
 */
export function getSupportedLocales() {

    return Object.keys(locales);

}

export default locales;