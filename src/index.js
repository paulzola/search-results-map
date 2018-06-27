'use strict';

import './style/default.css';
import './images/favicon.png';

import app from './app';

window.srm = () => app({
    container: document.getElementById('srm-app'),
});
