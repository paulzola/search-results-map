'use strict';

import Model from './model';
import Layout from './layout';
import SearchBox from './search-box';
import GMap from './g-map';
import History from './history';
//import * as storage from './storage';
import getDefaultCoords from './get-default-coords';

//const STORAGE_KEY = 'SRMModel';

const setMapPlace = (gMap, model) => {

    const place = model.getPlace();

    if (place.location) {
        gMap.addMarker(place);
        return;
    }

    getDefaultCoords(coords => {
        if (!model.getPlace().location) {
            gMap.setCenter(coords);
        }
    });
};

const app = ({container}) => {

    // const savedData = storage.load(STORAGE_KEY);

    // const model = new Model({
    //     place: savedData.place,
    //     history: savedData.history,
    // });

    const model = new Model();

    const layout = new Layout({container});

    new SearchBox({
        container: layout.getSearchBoxContainer(),
        onPlaceChange: place => {
            model.setPlace(place);
            model.addHistoryItem(place);
        },
    });

    const gMap = new GMap({container: layout.getMapContainer()});
    setMapPlace(gMap, model);

    const history = new History({
        container: layout.getHistoryContainer(),
        onCardClick: id => model.selectHistoryItem(id),
    });

    const historyData = model.getHistory();
    history.render(historyData);

    model.subscribe('onPlaceChange', place => gMap.addMarker(place));
    model.subscribe('onAddHistoryItem', historyItem => history.addHistoryCard(historyItem));

    // window.addEventListener('beforeunload', () => {
    //     storage.save({
    //         data: {
    //             place: model.getPlace(),
    //             history: model.getHistory(),
    //         },
    //         key: STORAGE_KEY,
    //     });
    // });

};

export default app;
