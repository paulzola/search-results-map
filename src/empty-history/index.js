'use strict';

import '../icons/list-icon.css';
import './style.css';

const emptyHistory = () =>
    `
    <div class="srm-empty-history">
        <span class="srm-empty-history__icon srm-list-icon">
        </span><span class="srm-empty-history__text srm-place-location">
            Здесь будут ваши<br />найденные места
        </span>
    </div>
    `;

export default emptyHistory;
