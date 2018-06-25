'use strict';

import * as ee from '../event-emmiter';

let instanceCount = 0;

class Model {

    constructor (data = {}) {

        const {
            place = {},
            history = [],
            eventEmitter = ee,
        } = data;

        this.place = place;
        this.history = history;
        this.eventEmitter = eventEmitter;
        this.instanceCount = instanceCount++;
    }

    _collectPlaceObj (place) {
        if (place.id) {
            return place;
        }
        const {location} = place;
        const id = `${location.lat}-${location.lng}`;
        return Object.assign({}, place, {id});
    }

    setPlace (place) {

        const newPlace = this._collectPlaceObj(place);

        if (this.place.id === newPlace.id) {
            return;
        }

        this.place = newPlace;
        this.publish('onPlaceChange', this.place);
    }

    addHistoryItem (place) {
        this.history.unshift(this._collectPlaceObj(place));
        this.publish('onHistoryChange', this.history);
    }

    selectHistoryItem (id) {

        if (!this.history.length) {
            return;
        }

        const historyPlace = this.history.find(i => i.id === id);

        if (historyPlace) {
            this.setPlace(historyPlace);
        }
    }

    subscribe (key, callback) {
        this.eventEmitter.subscribe(this._getInstanceName(key), callback);
    }

    unSubscribe (key, callback) {
        this.eventEmitter.unsubscribe(this._getInstanceName(key), callback);
    }

    publish (key, data) {
        this.eventEmitter.publish(this._getInstanceName(key), data);
    }

    _getInstanceName (key) {
        const name = `Model-${this.instanceCount}`;
        return key ? `${name}-${key}` : name;
    }

    static create (data) {
        return new Model(data);
    }

}

export default Model;
