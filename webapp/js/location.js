// =================================
// LOCATION ENGINE
// Drink Nearby
// =================================

let userPosition = null;

let userMarker = null;
let accuracyCircle = null;

let firstLocation = true;

let watchId = null;

// =================================
// Запуск отслеживания GPS
// =================================

function locateUser() {

    if (!navigator.geolocation) {

        console.log("GPS unavailable");
        return;

    }

    // Чтобы не создавать несколько watchPosition
    if (watchId !== null) {
        return;
    }

    watchId = navigator.geolocation.watchPosition(

        updateUserLocation,

        onLocationError,

        {

            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 3000

        }

    );

}

// =================================
// Получили новую позицию
// =================================

function updateUserLocation(position) {

    userPosition = {

        lat: position.coords.latitude,
        lon: position.coords.longitude,
        accuracy: position.coords.accuracy

    };

    console.log("User position:", userPosition);

    drawUser();

    loadMeetings();

    // Центрируем карту только один раз
    if (firstLocation && map) {

        map.flyTo(
            [userPosition.lat, userPosition.lon],
            16,
            {
                duration: 1
            }
        );

        firstLocation = false;

    }

}

// =================================
// Ошибка GPS
// =================================

function onLocationError(error) {

    console.error("GPS error:", error);

}

// =================================
// Рисуем пользователя
// =================================

function drawUser() {

    if (!map) return;

    userLayer.clearLayers();

    // Круг точности GPS
    accuracyCircle = L.circle(

        [userPosition.lat, userPosition.lon],

        {

            radius: userPosition.accuracy,

            color: "#2F80ED",

            weight: 1,

            fillColor: "#2F80ED",

            fillOpacity: 0.12

        }

    );

    // Синяя точка пользователя
    userMarker = L.circleMarker(

        [userPosition.lat, userPosition.lon],

        {

            radius: 9,

            color: "#FFFFFF",

            weight: 3,

            fillColor: "#2F80ED",

            fillOpacity: 1

        }

    );

    userLayer.addLayer(accuracyCircle);
    userLayer.addLayer(userMarker);

}

// =================================
// Возврат к пользователю
// =================================

function centerOnUser() {

    if (!userPosition || !map) return;

    map.flyTo(

        [userPosition.lat, userPosition.lon],

        16,

        {

            duration: 1

        }

    );

}