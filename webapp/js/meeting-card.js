// =================================
// MEETING CARD
// Drink Nearby
// =================================

let currentMeeting = null;

function openMeetingCard(meeting) {

    currentMeeting = meeting;

    BottomSheet.open(`

        <div class="meeting-card">

            <div class="meeting-header">

                <img
                    class="meeting-avatar"
                    src="${meeting.photo}"
                >

                <div>

                    <h2>${meeting.name}, ${meeting.age}</h2>

                    <div class="meeting-distance">

                        📍 ${meeting.distance}

                    </div>

                </div>

            </div>

            <div class="meeting-info">

                🍺 <b>${meeting.drink}</b>

                <br><br>

                ⏱️ Осталось <b>${meeting.duration}</b>

                <br><br>

                💬 ${meeting.text}

            </div>

            <div class="meeting-buttons">

                <button onclick="routeToMeeting()">

                    🚶 Построить маршрут

                </button>

                <button onclick="BottomSheet.close()">

                    Закрыть

                </button>

            </div>

        </div>

    `);

}

function routeToMeeting(){

    if(!currentMeeting){

        return;

    }

    buildRoute(

        currentMeeting.lat,

        currentMeeting.lon

    );

}