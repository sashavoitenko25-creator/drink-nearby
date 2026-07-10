document.addEventListener(
"DOMContentLoaded",
()=>{


console.log(
"Drink Nearby started"
);



applyTelegramTheme();



const user =
getTelegramUser();



console.log(
"Telegram user:",
user
);



initSupabase();



initMap();


locateUser();


loadMeetings();



BottomSheet.init();




});