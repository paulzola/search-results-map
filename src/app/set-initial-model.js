'use strict';

import * as storage from '../storage';
import STORAGE_KEY from './storage-key';

const setInitialModel = model => {

    const {
        place = {},
        history = [],
    } = storage.load(STORAGE_KEY);

    model.setPlace(place);
    model.setHistory(history);
    model.setPrevHistory([]);

};

export default setInitialModel;
