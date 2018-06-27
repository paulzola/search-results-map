'use strict';

import './style.css';

class HistoryToggle {

    constructor ({container, onHistoryShowChange}) {
        this.container = container;
        this.onHistoryShowChange = onHistoryShowChange;
        this.historyShow = false;
        this._createBox();
    }

    _createButton () {
        const button = document.createElement('button');
        button.className = 'srm-history-toggle';
        const icon = document.createElement('span');
        icon.className = 'srm-history-toggle__icon srm-list-icon';
        button.appendChild(icon);
        button.title = 'Показать / скрыть историю';
        return button;
    }

    _createBox () {
        const button = this._createButton();
        this.container.appendChild(button);
        this.button = button;
        this.button.addEventListener('click', this._handleButtonClick);
    }

    _handleButtonClick = () => {
        this.historyShow = !this.historyShow;
        this.onHistoryShowChange(this.historyShow);
    }

    showHistory () {
        this.historyShow = true;
        this.onHistoryShowChange(this.historyShow)
    }

    hideHistory () {
        this.historyShow = false;
        this.onHistoryShowChange(this.historyShow);
    }

    tease () {
        this.button.classList.add('srm-history-toggle_tease');
        setTimeout(() => this.button.classList.remove('srm-history-toggle_tease'), 500);
    }


}

export default HistoryToggle;
