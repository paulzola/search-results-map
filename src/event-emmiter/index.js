'use strict';

const channels = new Map();

const send = (key, f) => {
    try {
        f(key);
    } catch (err) {
        /*eslint-disable no-console*/
        console.log(err);
        /*eslint-enable no-console */
    }
};

const publish = (key, data) => {
    if (!channels.has(key)) {
        return;
    }
    const subscribers = channels.get(key);
    subscribers.forEach(s => send(data, s));
};

const subscribe = (key, callback) => {
    if (!channels.has(key)) {
        channels.set(key, new Set());
    }
    const subscribers = channels.get(key);
    subscribers.add(callback);
};

const unsubscribe = (key, callback) => {
    if (channels.has(key)) {
        const subscribers = channels.get(key);
        subscribers.delete(callback);
        if (subscribers.size === 0) {
            channels.delete(key);
        }
    }
};

export {publish, subscribe, unsubscribe};
