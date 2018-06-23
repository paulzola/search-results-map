'use strict';

class Layout {

    constructor ({container}) {
        this.container = container;
    }

    _createElement (className) {
        const el = document.createElement('div');
        el.className = className;
        return el;
    }

    getSearchBoxContainer () {
        return this.searchBox;
    }

    getHistoryContainer () {
        return this.history;
    }

    getMapContainer () {
        return this.map;
    }

    render () {

        this.root = this._createElement('srm-layout');
        this.searchBox = this._createElement('srm-layout__search-box');
        this.history = this._createElement('srm-layout__history');
        this.map = this._createElement('srm-layout__map');

        this.root.appendChild(this.searchBox);
        this.root.appendChild(this.history);
        this.root.appendChild(this.map);

        this.container.appendChild(this.root);
    }

    static create (data) {
        return new Layout(data);
    }

}

export default Layout;
