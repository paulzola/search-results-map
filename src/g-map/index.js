'use strict';

import './style.css';

class GMap {

    constructor ({container}) {
        this.container = container;
        this.marker = null;
        this._createBox();
    }

    _createBox () {
        const box = document.createElement('div');
        box.className = 'srm-map';
        this.container.appendChild(box);
        this.box = box;
    }

    _createMap (coords) {
        this.map = new window.google.maps.Map(this.box, {
            center: coords,
            zoom: 16,
        });
    }

    _createMarker (place) {

        const {
            name,
            location,
        } = place;

        this.marker = new window.google.maps.Marker({
            position: location,
            label: name,
            map: this.map,
        });

    }

    setCenter (location) {

        if (!this.map) {
            this._createMap(location);
            return;
        }

        this.map.setCenter(location);
    }

    addMarker (place) {

        const {
            name,
            location,
        } = place;

        if (!this.map) {
            this._createMap(location);
        }

        if (this.marker === null) {
            this._createMarker(place);
            this.setCenter(location);
            return;
        }

        this.marker.setMap(null);
        this.marker.setLabel(name);
        this.marker.setPosition(location);
        this.setCenter(location);

    }

}

export default GMap;
