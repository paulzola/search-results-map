'use strict';

import '../icons/list-icon.css';
import './style.css';

const showLoading = container => {
    const box = document.createElement('div');
    box.className = 'srm-app-loader';
    const icon = document.createElement('div');
    icon.className = 'srm-app-loader__icon srm-list-icon';
    box.appendChild(icon);
    container.appendChild(box);
    return box;
};

const clear = (container, elem) => {
    container.removeChild(elem);
};


export {showLoading, clear};
