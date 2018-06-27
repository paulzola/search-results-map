'use strict';

const epsilon = 0.0000000000001;

const ceil = (number, precision = 0) => {
    if (precision === 0) {
        return Math.ceil(number);
    }
    const decPlaces = Math.pow(10, precision);
    return Math.ceil(number * decPlaces - epsilon) / decPlaces;
};

export default ceil;
