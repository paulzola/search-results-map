'use strict';

class SearchBox {

    constructor ({container}) {
        this.container = container;
    }

    render () {

        const box = document.createElement('div');
        box.className = 'srm-search-box';

        const input = document.createElement('input');
        input.className = 'srm-search-box__input';

        box.appendChild(input);
        this.container.appendChild(box);

        new window.google.maps.places.Autocomplete(input);

    }

    static create (data) {
        return new SearchBox(data);
    }

}

export default SearchBox;
