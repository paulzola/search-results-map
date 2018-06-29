'use strict';

import './style/default.css';
import './images';

import * as appLoader from './app-loader';
import app from './app';

const container = document.getElementById('srm-app');
const preloadElem = appLoader.showLoading(container);

window.searchresultsmapinit = () =>
    app({
        container,
        onReady: () => appLoader.clear(container, preloadElem),
    });
