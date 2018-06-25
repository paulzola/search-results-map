'use strict';

import Model from './model';
import Layout from './layout';
import SearchBox from './search-box';
import GMap from './g-map';
import History from './history';

const app = ({container}) => {

    const model = Model.create();

    const layout = Layout.create({container});

    SearchBox.create({
        container: layout.getSearchBoxContainer(),
        onPlaceChange: place => {
            model.setPlace(place);
            model.addHistoryItem(place);
        },
    });

    const gMap = GMap.create({container: layout.getMapContainer()});

    const historyComponent = History.create({
        container: layout.getHistoryContainer(),
        onCardClick: id => model.selectHistoryItem(id),
    });

    model.subscribe('onPlaceChange', place => gMap.render(place));
    model.subscribe('onHistoryChange', history => historyComponent.render(history));

};

export default app;
