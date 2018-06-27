'use strict';

import * as ee from '../event-emmiter';

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
        const nPlace = this._collectPlaceObj(place);
        this.history.unshift(nPlace);
        this.publish('onAddHistoryItem', nPlace);
    }

    getHistory () {
        return this.history;
    }

    getPlace () {
        return this.place;
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
        this.eventEmitter.subscribe(this._getEventName(key), callback);
    }

    unSubscribe (key, callback) {
        this.eventEmitter.unsubscribe(this._getEventName(key), callback);
    }

    publish (key, data) {
        this.eventEmitter.publish(this._getEventName(key), data);
    }

    _getEventName (key) {
        const name = 'SRM-Model';
        return key ? `${name}-${key}` : name;
    }

}

export default Model;
