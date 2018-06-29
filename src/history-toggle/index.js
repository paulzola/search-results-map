'use strict';

import './style.css';

const offStatus = {
    title: 'Показать историю поиска',
    class: 'srm-history-toggle_open',
};

const onStatus = {
    title: 'Скрыть историю поиска',
    class: 'srm-history-toggle_close',
};

class HistoryToggle {

    constructor ({container, onClick}) {
        this.container = container;
        this.onClick = onClick;
        this.currentStatusClass = null;
        this._createBox();
    }

    _createButton () {
        const button = document.createElement('button');
        button.className = 'srm-history-toggle';

        const icon = document.createElement('span');
        icon.className = 'srm-history-toggle__icon srm-list-icon';
        button.appendChild(icon);

        return button;
    }

    _createBox () {
        const button = this._createButton();
        this.container.appendChild(button);
        this.button = button;
        this.button.addEventListener('click', this._handleButtonClick);
    }


    _handleButtonClick = () => {
        this.onClick();
    }

    tease () {
        const TEASE_CLASS = 'srm-history-toggle_tease';
        this.button.classList.add(TEASE_CLASS);
        setTimeout(() => this.button.classList.remove(TEASE_CLASS), 500);
    }

    toggleStatus (historyShow) {

        const status = historyShow ? onStatus : offStatus;

        this.button.title = status.title;

        if (this.currentStatusClass) {
            this.button.classList.remove(this.currentStatusClass);
        }

        this.button.classList.add(status.class);
        this.currentStatusClass = status.class;
    }

}

export default HistoryToggle;
