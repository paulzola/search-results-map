'use strict';

import * as ee from '../event-emmiter';

class Model {

    constructor (data = {eventEmitter: ee}) {

        const {
            eventEmitter,
        } = data;

        this.place = {};
        this.history = [];
        this.prevHistory = [];
        this.historyShow = false;
        this.activePlaceOnHistory = null;
        this.eventEmitter = eventEmitter;
    }

    getHistory () {
        return this.history;
    }

    getHistoryShow () {
        return this.historyShow;
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

        if (!place) {
            return;
        }

        const newPlace = this._collectPlaceObj(place);

        if (this.place.id === newPlace.id) {
            return;
        }

        this.place = newPlace;
        this.publish('onPlaceChange', this.place);
    }

    setHistory (history) {

        if (!history) {
            return;
        }

        this.setPrevHistory([]);

        this.history = history;

        const activePlace = this.history.find(i => i.active);

        if (activePlace) {
            this.setPlaceActiveInHistory(activePlace);
        }

        this.publish('onHistoryChange', this.history);
    }

    clearHistory () {
        const prevHistory = this.history.slice();
        this.history = [];
        this.setPrevHistory(prevHistory);
        this.publish('onHistoryChange', this.history);
    }

    setPrevHistory (prevHistory) {
        this.prevHistory = prevHistory;
        this.publish('onPrevHistorySet', prevHistory);
    }

    returnPrevHistory () {

        if (!this.prevHistory.length) {
            return;
        }

        this.setHistory(this.prevHistory);
        this.setPrevHistory([]);
    }

    toggleHistoryShow () {
        this.historyShow = !this.historyShow;
        this.publish('onHistoryShowToggle', this.historyShow);
    }

    setPlaceActiveInHistory (place) {

        if (this.activePlaceOnHistory) {
            this.activePlaceOnHistory.active = false;
        }

        this.activePlaceOnHistory = place;
        this.activePlaceOnHistory.active = true;

    }

    makeCurrentPlaceHistory () {
        this.history.unshift(this.place);
        this.setPrevHistory([]);
        this.setPlaceActiveInHistory(this.place);
        this.publish('onHistoryChange', this.history);
        this.publish('onMakeCurrentPlaceHistory');
    }

    selectHistoryPlace (id) {

        if (!this.history.length) {
            return;
        }

        const historyPlace = this.history.find(i => i.id === id);

        if (historyPlace) {
            this.setPlace(historyPlace);
            this.setPlaceActiveInHistory(historyPlace);
            this.publish('onHistoryChange', this.history);
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
