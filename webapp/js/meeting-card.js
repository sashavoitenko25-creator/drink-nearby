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

                <div class="meeting-user">

                    <h2>${meeting.name}, ${meeting.age}</h2>

                    <div class="meeting-distance">

                        📍 ${meeting.distance}

                    </div>

                </div>

            </div>

            <div class="meeting-drink">

                ${meeting.drink}

            </div>

            <div class="meeting-chip">

                ⏱ Осталось ${meeting.duration}

            </div>

            <div class="meeting-text">

                ${meeting.text}

            </div>

            <div class="meeting-buttons">

                <button
                    class="btn btn-primary icon-button"
                    onclick="BottomSheet.showRoute(currentMeeting)"
                >

                    🚶 Построить маршрут

                </button>

                <button
                    class="btn btn-secondary icon-button"
                >

                    🍺 Предложить место встречи

                </button>

                <button
                    class="btn btn-secondary"
                    onclick="BottomSheet.close()"
                >

                    Закрыть

                </button>

            </div>

        </div>

    `);

}