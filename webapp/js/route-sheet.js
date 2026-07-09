// =================================
// ROUTE SHEET
// Drink Nearby
// =================================

let currentRouteMeeting = null;

function openRouteSheet(meeting){

    currentRouteMeeting = meeting;

    BottomSheet.open(`

        <h2>Построить маршрут</h2>

        <br>

        <button onclick="showRouteToPerson()">

            👤 К человеку

        </button>

        <br><br>

        <button onclick="showMeetingPlaceSelector()">

            🍺 К месту встречи

        </button>

        <br><br>

        <button onclick="BottomSheet.close()">

            Закрыть

        </button>

    `);

}

function showRouteToPerson(){

    BottomSheet.open(`

        <h2>Выберите транспорт</h2>

        <br>

        <button onclick="buildWalkingRoute()">

            🚶 Пешком

        </button>

        <br><br>

        <button onclick="buildDrivingRoute()">

            🚗 На машине

        </button>

        <br><br>

        <button onclick="openRouteSheet(currentRouteMeeting)">

            ← Назад

        </button>

    `);

}

function buildWalkingRoute(){

    setWalkingMode();

    buildRoute(

        currentRouteMeeting.lat,

        currentRouteMeeting.lon

    );

}

function buildDrivingRoute(){

    setDrivingMode();

    buildRoute(

        currentRouteMeeting.lat,

        currentRouteMeeting.lon

    );

}

function showMeetingPlaceSelector(){

    BottomSheet.open(`

        <h2>🍺 Место встречи</h2>

        <br>

        <p>

        Эта функция будет подключена в PHASE 5.

        </p>

        <br>

        <button onclick="openRouteSheet(currentRouteMeeting)">

            ← Назад

        </button>

    `);

}