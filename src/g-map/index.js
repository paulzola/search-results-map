'use strict';

import './style.css';

class GMap {

    constructor ({container}) {
        this.container = container;
    }

    render () {

        const box = document.createElement('div');
        box.className = 'srm-map';

        this.container.appendChild(box);

        const map = new window.google.maps.Map(box, {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8,
        });

    }

    static create (data) {
        return new GMap(data);
    }

}

export default GMap;
