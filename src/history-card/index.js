'use strict';

const historyCard = ({name, location}) =>
    `
    <div class="srm-history-card">
        <div class="srm-history-card__name">${name}</div>
        <div class="srm-history-card__location">${location.lat} ${location.lng}</div>
    </div>
    `;

export default historyCard;
