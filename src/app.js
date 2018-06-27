'use strict';

import Model from './model';
import Layout from './layout';
import SearchBox from './search-box';
import GMap from './g-map';
import History from './history';
import * as storage from './storage';
import getDefaultCoords from './get-default-coords';
import HistoryToggle from './history-toggle';

const STORAGE_KEY = 'SRMModel';

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

const setInitialModel = model => {

    const {
        place = {},
        history = [],
    } = storage.load(STORAGE_KEY);

    model.setPlace(place);
    model.setHistory(history);

};

const saveToStorage = model => {
    window.addEventListener('beforeunload', () => {
        storage.save({
            data: {
                place: model.getPlace(),
                history: model.getHistory(),
            },
            key: STORAGE_KEY,
        });
    });
};

const app = ({container}) => {

    const model = new Model();

    const layout = new Layout({container});

    new SearchBox({
        container: layout.getSearchBoxContainer(),
        onPlaceChange: place => {
            model.setPlace(place);
            model.makeCurrentPlaceHistory();
        },
    });

    const gMap = new GMap({container: layout.getMapContainer()});

    const history = new History({
        container: layout.getHistoryContainer(),
        onCardClick: id => model.selectHistoryPlace(id),
    });

    const historyToggle = new HistoryToggle({
        container: layout.getHistoryToggleContainer(),
        onHistoryShowChange: historyShow => layout.setHistoryShow(historyShow),
    });

    model.subscribe('onPlaceChange', place => {
        gMap.addMarker(place);
        historyToggle.hideHistory();
    });

    model.subscribe('onHistoryChange', historyData => history.render(historyData));

    model.subscribe('onMakeCurrentPlaceHistory', () => {
        layout.scrollToTop();
        historyToggle.tease();
    });

    setInitialModel(model);
    saveToStorage(model);
    setMapPlace(gMap, model);

};

export default app;
