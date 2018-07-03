'use strict';

import Model from '../model';
import Layout from '../layout';
import SearchBox from '../search-box';
import GMap from '../g-map';
import History from '../history';
import HistoryToggle from '../history-toggle';
import HistoryClear from '../history-clear';
import windowSize from '../window-size';

import setInitialModel from './set-initial-model';
import setMapPlace from './set-map-place';
import saveToStorage from './save-to-storage';

const app = ({container, onReady}) => {
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

    const historyToggle = new HistoryToggle({
        container: layout.getHistoryToggleContainer(),
        onClick: () => model.toggleHistoryShow(),
    });

    const history = new History({
        container: layout.getHistoryContainer(),
        onCardClick: id => {
            model.selectHistoryPlace(id);
            if (windowSize.getScreenParams().isSmallScreen) {
                model.toggleHistoryShow();
            }
        },
    });

    const historyClear = new HistoryClear({
        container: layout.getHistoryClearContainer(),
        onClearClick: () => model.clearHistory(),
        onUndoClick: () => model.returnPrevHistory(),
    });

    model.subscribe('onPlaceChange', place => {
        gMap.addMarker(place);
    });

    model.subscribe('onHistoryChange', historyData => {
        history.render(historyData);
        historyClear.showHistory(historyData);
    });

    model.subscribe('onPrevHistorySet', prevHistory => historyClear.showPrevHistory(prevHistory));

    model.subscribe('onHistoryShowToggle', historyShow => {
        layout.historyShow(historyShow);
        historyToggle.toggleStatus(historyShow);
    });

    model.subscribe('onMakeCurrentPlaceHistory', () => {
        layout.scrollToTop();
        historyToggle.tease();
    });

    setInitialModel(model);
    setMapPlace(gMap, model);
    historyToggle.toggleStatus(model.getHistoryShow());
    saveToStorage(model);

    onReady();
};

export default app;
