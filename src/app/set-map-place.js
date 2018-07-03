'use strict';

import getDefaultCoords from '../get-default-coords';

const setMapPlace = (gMap, model) => {

    const place = model.getPlace();

    if (place && place.location) {
        return;
    }

    getDefaultCoords(coords => {
        if (!model.getPlace().location) {
            gMap.setCenter(coords);
        }
    });
};

export default setMapPlace;
