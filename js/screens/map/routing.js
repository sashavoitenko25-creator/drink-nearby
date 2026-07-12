// ============================================
// ROUTING SERVICE
// ============================================


export async function getRoute(

    start,

    end,

    mode = "foot"

){


    const url =

        `https://router.project-osrm.org/route/v1/${mode}/` +

        `${start.longitude},${start.latitude};` +

        `${end.longitude},${end.latitude}` +

        `?overview=full&geometries=geojson`;



    const response =
        await fetch(url);



    const data =
        await response.json();



    if(
        !data.routes ||
        !data.routes.length
    ){

        throw new Error(
            "Route not found"
        );

    }



    const route =
        data.routes[0];



    return {


        distance:

            Math.round(
                route.distance
            ),



        duration:

            Math.round(
                route.duration / 60
            ),



        geometry:

            route.geometry.coordinates


    };


}