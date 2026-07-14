/**
 * ============================================================
 * Компанько
 * Location Service
 * ============================================================
 *
 * Ответственность:
 * - получение GPS
 * - отслеживание позиции
 * - отправка координат через EventBus
 *
 * ============================================================
 */


import EventBus, { Events } from '../core/EventBus.js';



class LocationService {



    constructor(){


        this.watchId = null;


    }





    getCurrentPosition(){



        return new Promise((resolve, reject)=>{


            if(!navigator.geolocation){


                reject(

                    new Error(
                        'Geolocation not supported'
                    )

                );


                return;


            }





            navigator.geolocation.getCurrentPosition(



                position => {



                    const data = this.normalize(

                        position

                    );



                    console.log(

                        '[LocationService] current:',

                        data

                    );



                    EventBus.emit(

                        Events.LOCATION_UPDATED,

                        data

                    );



                    resolve(data);



                },



                error => {


                    reject(error);


                },



                {


                    enableHighAccuracy:true,


                    timeout:15000,


                    maximumAge:0


                }


            );



        });



    }





    watch(){



        if(!navigator.geolocation){


            return;


        }





        this.watchId =

            navigator.geolocation.watchPosition(



                position => {



                    const data = this.normalize(

                        position

                    );



                    console.log(

                        '[LocationService] watch:',

                        data

                    );



                    EventBus.emit(

                        Events.LOCATION_UPDATED,

                        data

                    );



                },



                error => {



                    console.warn(

                        'Location watch error:',

                        error

                    );



                },



                {


                    enableHighAccuracy:true,


                    timeout:15000,


                    maximumAge:5000


                }


            );



    }





    normalize(position){



        if(

            !position ||

            !position.coords

        ){



            return null;


        }





        return {


            lat:

                Number(

                    position.coords.latitude

                ),



            lng:

                Number(

                    position.coords.longitude

                ),



            accuracy:

                Number(

                    position.coords.accuracy

                )



        };



    }





    stop(){



        if(this.watchId !== null){



            navigator.geolocation.clearWatch(

                this.watchId

            );



            this.watchId = null;


        }


    }



}





export default new LocationService();