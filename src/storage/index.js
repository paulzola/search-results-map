'use strict';

const save = ({data, key}) => {
    const value = JSON.stringify(data);
    localStorage.setItem(key, value);
};

const load = key => {
    const json = window.localStorage.getItem(key);
    if (json) {
        return JSON.parse(json);
    }
    return {};
};

export {save, load};
