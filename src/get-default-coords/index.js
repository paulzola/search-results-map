'use strict';

const DEFAULT_COORDS = {lat: 56.004840, lng: 92.844357};

const getDefaultCoords = callback => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            callback({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });
        return;
    }

    callback(DEFAULT_COORDS);

};

export default getDefaultCoords;
