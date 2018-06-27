'use strict';

const DEFAULT_COORDS = {lat: 33.747252, lng: -112.633853};

const getDefaultCoords = callback => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                callback({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            }
        );
    }

    callback(DEFAULT_COORDS);

};

export default getDefaultCoords;
