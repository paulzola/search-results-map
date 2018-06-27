'use strict';

import '../style/components/text.css';
import './style.css';

import ceil from '../ceil';

const historyCard = ({name, location, active}) => {

    const boxClass = `srm-history-card${active ? ' srm-history-card_active' : ''}`;

    const content =
    `
    <div class="${boxClass}">
        <div class="srm-place-name srm-history-card__name">${name}</div>
        <div class="srm-place-location srm-history-card__location">
        ${ceil(location.lat, 2)} ${ceil(location.lng, 2)}
        </div>
    </div>
    `;

    return content;

};


export default historyCard;
