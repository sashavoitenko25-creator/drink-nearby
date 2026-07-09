const tg = window.Telegram?.WebApp


if(tg){

    tg.ready()

    tg.expand()


    console.log(
        "Telegram WebApp loaded"
    )


}else{

    console.log(
        "Browser mode"
    )

}



function getTelegramUser(){

    if(!tg) return null


    return tg.initDataUnsafe?.user || null

}



function sendToBot(data){


    if(!tg){

        console.log(data)

        return

    }


    tg.sendData(
        JSON.stringify(data)
    )


}

function getTelegramTheme(){


    if(!tg){

        return "dark";

    }


    return tg.colorScheme;


}



function applyTelegramTheme(){


    const theme =
    getTelegramTheme();



    document.body.dataset.theme =
    theme;



    console.log(
        "Theme:",
        theme
    );


}