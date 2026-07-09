// =================================
// UI Manager
// Drink Nearby
// =================================


const UI = {


    setStatus(text){

        const el =
        document.getElementById(
            "connection-status"
        );


        if(el){

            el.innerHTML = text;

        }

    },



    showMessage(text){

        console.log(
            "UI:",
            text
        );

    }



};



// кнопка создания встречи

document.addEventListener(
"DOMContentLoaded",
()=>{


const createButton =
document.getElementById(
"create-button"
);



if(createButton){


createButton.addEventListener(
"click",
()=>{


UI.showMessage(
"Создание встречи"
);



sendToBot({

    action:"create_meeting"

});


});


}



const locationButton =
document.getElementById(
"location-button"
);



if(locationButton){


locationButton.addEventListener(
"click",
()=>{


centerOnUser();



});


}



});