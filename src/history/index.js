'use strict';

import historyCard from '../history-card';
import recursiveNodeCheck from '../recursive-node-check';

class History {

    constructor ({container, onCardClick}) {
        this.container = container;
        this.onCardClick = onCardClick;
        this._createBox();
    }

    _createBox () {
        const box = document.createElement('div');
        box.className = 'srm-history';
        this.container.appendChild(box);
        this.box = box;
        this.box.addEventListener('click', this._handleBoxClick);
    }

    _handleBoxClick = e => {

        const check = recursiveNodeCheck(e.target, this._cardNodeCheck);

        if (check && typeof check.result === 'string') {
            this.onCardClick(check.result);
        }
    }

    _cardNodeCheck = node => node.getAttribute && node.getAttribute('data-history-id');

    _clearElement (box) {
        while (box.firstChild) {
            box.removeChild(box.firstChild);
        }
    }

    _getCardBox (historyItem) {
        const cardBox = document.createElement('div');
        cardBox.className = 'srm-history__item';
        cardBox.setAttribute('data-history-id', historyItem.id);
        cardBox.innerHTML = historyCard(historyItem);
        return cardBox;
    }

    render (history) {

        console.log('history', history);

        if (!history || !history.length) {
            return;
        }

        this._clearElement(this.box);

        const historyFragment = document.createDocumentFragment();
        history.forEach(i => {
            historyFragment.appendChild(this._getCardBox(i));
        });
        this.box.appendChild(historyFragment);
    }

    static create (data) {
        return new History(data);
    }

}

export default History;
