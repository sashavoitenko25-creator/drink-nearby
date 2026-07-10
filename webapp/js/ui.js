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

// =================================
// TEST
// =================================

window.testSheet = function(){

    BottomSheet.open(`

        <h2>🍻 Drink Nearby</h2>

        <p>Bottom Sheet работает.</p>

        <p>Теперь сюда будут открываться анкеты пользователей.</p>

        <button
            onclick="BottomSheet.close()"
            style="
                margin-top:20px;
                width:100%;
                padding:14px;
                border:none;
                border-radius:12px;
                font-size:16px;
                cursor:pointer;
            "
        >

            Закрыть

        </button>

    `);

}