class UserMarker {

    constructor(map, user) {

        this.map = map;
        this.user = user;

        this.marker = null;

        this.create();

    }

    create() {

        this.marker = L.marker(
            [this.user.lat, this.user.lng],
            {
                icon: L.divIcon({

                    className: "user-marker",

                    html: `
                        <div class="user-marker__glow"></div>

                        <img
                            class="user-marker__avatar"
                            src="${this.user.avatar}"
                        >
                    `,

                    iconSize: [70,70],
                    iconAnchor: [35,35]

                })
            }
        ).addTo(this.map);

    }

    update(lat,lng){

        this.marker.setLatLng([lat,lng]);

    }

    destroy(){

        if(this.marker){

            this.map.removeLayer(this.marker);

        }

    }

}

export default UserMarker;