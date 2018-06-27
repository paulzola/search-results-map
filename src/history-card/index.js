'use strict';

import '../style/components/text.css';
import './style.css';

import ceil from '../ceil';

const historyCard = ({name, location}) =>
    `
    <div class="srm-history-card">
        <div class="srm-place-name srm-history-card__name">${name}</div>
        <div class="srm-place-location srm-history-card__location">
        ${ceil(location.lat, 2)} ${ceil(location.lng, 2)}
        </div>
    </div>
    `;

export default historyCard;
