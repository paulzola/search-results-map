'use strict';

import Layout from './layout';
import SearchBox from './search-box';
import GMap from './g-map';

const app = ({container}) => {

    const layout = Layout.create({container});
    layout.render();

    const searchBox = SearchBox.create({container: layout.getSearchBoxContainer()});
    searchBox.render();

    const gMap = GMap.create({container: layout.getMapContainer()});
    gMap.render();

};

export default app;
