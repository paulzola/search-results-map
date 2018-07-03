'use strict';

import * as storage from '../storage';
import STORAGE_KEY from './storage-key';

const saveToStorage = model => {
    window.addEventListener('beforeunload', () => {

        let place = model.getPlace();
        const history = model.getHistory();

        if (!history.length) {
            place = {};
        }

        storage.save({
            data: {
                place,
                history,
            },
            key: STORAGE_KEY,
        });
    });
};

export default saveToStorage;
