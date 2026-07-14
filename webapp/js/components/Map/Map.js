/**
 * ============================================================
 * Компанько
 * Map Component
 * ------------------------------------------------------------
 * Управляет экземпляром карты Leaflet.
 *
 * Ответственность:
 * - создание карты
 * - инициализация Leaflet
 * - управление экземпляром карты
 * - предоставление API другим компонентам
 *
 * НЕ отвечает за:
 * - GPS
 * - пользователей
 * - маршруты
 * - события
 * - LIVE
 * ============================================================
 */

class Map {

    constructor(options = {}) {

        this.element = null;

        this.map = null;

        this.options = {

            center: options.center || [50.4501, 30.5234],

            zoom: options.zoom || 15,

            minZoom: 3,

            maxZoom: 20,

            zoomControl: false,

            attributionControl: false,

            preferCanvas: true,

            ...options

        };

    }

    /**
     * Создание DOM
     */
    create() {

        this.element = document.createElement('div');

        this.element.className = 'map';

        return this.element;

    }

    /**
     * Инициализация Leaflet
     */
    initialize() {

        if (!this.element) {

            throw new Error('Map element is not created.');

        }

        this.map = L.map(this.element, {

            center: this.options.center,

            zoom: this.options.zoom,

            minZoom: this.options.minZoom,

            maxZoom: this.options.maxZoom,

            zoomControl: this.options.zoomControl,

            attributionControl: this.options.attributionControl,

            preferCanvas: this.options.preferCanvas

        });

        L.tileLayer(

            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

            {

                maxZoom: 20

            }

        ).addTo(this.map);

    }

    /**
     * Возвращает экземпляр Leaflet
     */
    getInstance() {

        return this.map;

    }

    /**
     * Центр карты
     */
    setCenter(lat, lng, zoom = this.map.getZoom()) {

        if (!this.map) return;

        this.map.setView([lat, lng], zoom, {

            animate: true,

            duration: 0.8

        });

    }

    /**
     * Изменение масштаба
     */
    setZoom(zoom) {

        if (!this.map) return;

        this.map.setZoom(zoom);

    }

    /**
     * Обновление размеров
     */
    invalidateSize() {

        if (!this.map) return;

        this.map.invalidateSize();

    }

    /**
     * Уничтожение
     */
    destroy() {

        this.map?.remove();

        this.map = null;

        this.element?.remove();

        this.element = null;

    }

}

export default Map;