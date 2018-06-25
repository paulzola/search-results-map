'use strict';

class SearchBox {

    constructor ({container, onPlaceChange}) {
        this.container = container;
        this.onPlaceChange = onPlaceChange;
        this._createBox();
    }

    _createBox () {
        const box = document.createElement('div');
        box.className = 'srm-search-box';
        const input = document.createElement('input');
        input.className = 'srm-search-box__input';
        this.input = input;
        box.appendChild(input);
        this.container.appendChild(box);
        this.autocomplete = new window.google.maps.places.Autocomplete(input);
        this.autocomplete.addListener('place_changed', this._handlePlaceChange);
    }

    _handlePlaceChange = () => {
        const place = this.autocomplete.getPlace();
        const location = place.geometry.location;
        this.onPlaceChange({
            name: place.name,
            location: {lat: location.lat(), lng: location.lng()},
        });
    }

    clear () {
        this.input.value = '';
    }

    static create (data) {
        return new SearchBox(data);
    }

}

export default SearchBox;
