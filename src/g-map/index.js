'use strict';

import './style.css';

class GMap {

    constructor ({container}) {
        this.container = container;
        this.defaultCoords = {lat: 56.004840, lng: 92.844357};
        this.marker = null;
        this._createBox();
    }

    _createBox () {
        const box = document.createElement('div');
        box.className = 'srm-map';
        this.container.appendChild(box);
        this.box = box;
        this._initMap();
    }

    _createMap (box) {
        this.map = new window.google.maps.Map(box, {
            center: this.defaultCoords,
            zoom: 16,
        });
    }

    _initMap () {

        const box = this.box;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.defaultCoords.lat = position.coords.latitude;
                this.defaultCoords.lng = position.coords.longitude;
                this._createMap(box);
            });
            return;
        }

        this._createMap(box);

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

        this.map.setCenter(location);
    }

    _addMarker (place) {

        if (this.marker === null) {
            this._createMarker(place);
            return;
        }

        const {
            name,
            location,
        } = place;

        this.marker.setMap(null);
        this.marker.setLabel(name);
        this.marker.setPosition(location);
        this.map.setCenter(location);

    }

    render (place) {
        this._addMarker(place);

    }

    static create (data) {
        return new GMap(data);
    }

}

export default GMap;
