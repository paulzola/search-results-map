'use strict';

import './style.css';

class Layout {

    constructor ({container}) {
        this.container = container;
        this._createBox();
    }

    _createElement (className) {
        const el = document.createElement('div');
        el.className = className;
        return el;
    }

    _createBox () {
        this.root = this._createElement('srm-layout');
        this.searchBox = this._createElement('srm-layout__search-box');
        this.historyToggle = this._createElement('srm-layout__history-toggle');
        this.history = this._createElement('srm-layout__history');
        this.map = this._createElement('srm-layout__map');

        this.root.appendChild(this.searchBox);
        this.root.appendChild(this.historyToggle);
        this.root.appendChild(this.history);
        this.root.appendChild(this.map);

        this.container.appendChild(this.root);
    }

    getSearchBoxContainer () {
        return this.searchBox;
    }

    getHistoryToggleContainer () {
        return this.historyToggle;
    }

    getHistoryContainer () {
        return this.history;
    }

    getMapContainer () {
        return this.map;
    }

    scrollToTop () {
        this.history.scrollTop = 0;
    }

    setHistoryShow (historyShow) {
        if (historyShow) {
            this.root.classList.add('srm-layout_history-show');
            return;
        }
        this.root.classList.remove('srm-layout_history-show');
    }

}

export default Layout;
