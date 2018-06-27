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
        this.activePlaceOnHistory = null;
        this.eventEmitter = eventEmitter;
    }

    getHistory () {
        return this.history;
    }

    getPlace () {
        return this.place;
    }

    _collectPlaceObj (place) {
        if (place.id) {
            return place;
        }
        const id = `${new Date().getTime()}`;
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

    setPlaceActiveInHistory (place) {

        if (this.activePlaceOnHistory) {
            this.activePlaceOnHistory.active = false;
        }

        this.activePlaceOnHistory = place;
        this.activePlaceOnHistory.active = true;

        this.publish('onHistoryChange', this.history);

    }

    makeCurrentPlaceHistory () {
        this.history.unshift(this.place);
        this.setPlaceActiveInHistory(this.place);
    }

    selectHistoryPlace (id) {

        if (!this.history.length) {
            return;
        }

        const historyPlace = this.history.find(i => i.id === id);

        if (historyPlace) {
            this.setPlace(historyPlace);
            this.setPlaceActiveInHistory(historyPlace);
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
