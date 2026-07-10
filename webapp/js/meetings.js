// =================================
// MEETINGS
// Drink Nearby
// =================================

const TEST_MEETINGS = [

{
    id:1,

    createdAt:Date.now(),

    user:{
        id:101,
        name:"Алекс",
        age:27,
        photo:"https://i.pravatar.cc/300?img=12"
    },

    meeting:{
        duration:30,
        drink:"🍺 Guinness",
        icon:"🍺",
        text:"После работы хочется выпить по пиву.",
        status:"active"
    }

},

{
    id:2,

    createdAt:Date.now()-1000*60*12,

    user:{
        id:102,
        name:"Ирина",
        age:24,
        photo:"https://i.pravatar.cc/300?img=32"
    },

    meeting:{
        duration:60,
        drink:"🍷 Aperol",
        icon:"🍷",
        text:"Есть свободный час.",
        status:"active"
    }

},

{
    id:3,

    createdAt:Date.now()-1000*60*8,

    user:{
        id:103,
        name:"Макс",
        age:31,
        photo:"https://i.pravatar.cc/300?img=15"
    },

    meeting:{
        duration:15,
        drink:"🥃 Whiskey",
        icon:"🥃",
        text:"Есть 15 минут.",
        status:"active"
    }

}

];

function getRemainingMinutes(meeting){

    const endTime =
        meeting.createdAt +
        meeting.meeting.duration * 60000;

    const left =
        Math.max(
            0,
            Math.floor(
                (endTime-Date.now())/60000
            )
        );

    return left;

}

function loadMeetings(){

    if(!userPosition){

        setTimeout(loadMeetings,500);

        return;

    }

    meetingLayer.clearLayers();

    const offsets=[

        {lat:0.0010,lon:0.0005},
        {lat:-0.0008,lon:0.0012},
        {lat:0.0007,lon:-0.0011}

    ];

    TEST_MEETINGS.forEach((meeting,index)=>{

        const left=getRemainingMinutes(meeting);

        if(left<=0){

            return;

        }

        const point=offsets[index];

        meeting.location={

            lat:userPosition.lat+point.lat,

            lon:userPosition.lon+point.lon,

            distance:(index+1)*120

        };

        createMeetingMarker(meeting,left);

    });

}

function createMeetingMarker(meeting,left){

    const icon=L.divIcon({

        className:"meeting-marker",

        html:`

        <div class="marker-card">

            <div class="marker-icon">

                ${meeting.meeting.icon}

            </div>

            <div class="marker-time">

                ${left} мин

            </div>

        </div>

        `,

        iconSize:[60,60],

        iconAnchor:[30,30]

    });

    const marker=L.marker(

        [

            meeting.location.lat,

            meeting.location.lon

        ],

        {icon}

    );

    marker.on("click",()=>{

        openMeetingCard({

            name: meeting.user.name,

            age: meeting.user.age,

            photo: meeting.user.photo,

            distance: meeting.location.distance + " м",

            drink: meeting.meeting.drink,

            duration: left + " минут",

            text: meeting.meeting.text,

            lat: meeting.location.lat,

            lon: meeting.location.lon

        });

    });

    meetingLayer.addLayer(marker);

}

// Обновляем встречи каждую минуту
setInterval(loadMeetings,60000);