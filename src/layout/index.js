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
        this.historyToggle = this._createElement('srm-layout__history-toggle');
        this.searchBox = this._createElement('srm-layout__search-box');
        this.history = this._createElement('srm-layout__history');

        this.historyClear = this._createElement('srm-layout__history-clear');
        this.historyCards = this._createElement('srm-layout__history-cards');
        this.history.appendChild(this.historyCards);
        this.history.appendChild(this.historyClear);

        this.map = this._createElement('srm-layout__map');

        this.root.appendChild(this.historyToggle);
        this.root.appendChild(this.searchBox);
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

    getHistoryClearContainer () {
        return this.historyClear;
    }

    getHistoryContainer () {
        return this.historyCards;
    }

    getMapContainer () {
        return this.map;
    }

    scrollToTop () {
        this.history.scrollTop = 0;
    }

    historyShow (historyShow) {
        const SHOW_CLASS = 'srm-layout_history-show';
        if (historyShow) {
            this.root.classList.add(SHOW_CLASS);
            return;
        }
        this.root.classList.remove(SHOW_CLASS);
    }

}

export default Layout;
