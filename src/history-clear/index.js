'use strict';

import './style.css';

class HistoryClear {

    constructor ({container, onClearClick, onUndoClick}) {
        this.container = container;
        this.onClearClick = onClearClick;
        this.onUndoClick = onUndoClick;
        this._createControls();
    }

    _createControls () {

        this.clearButton = this._createButton({
            text: 'очистить историю',
            className: 'srm-clear-history-button',
            onClick: this._handleClearClick,
        });

        this.undoButton = this._createButton({
            text: 'восстановить историю',
            className: 'srm-clear-history-button',
            onClick: this._handleUndoClick,
        });


        this._showBlock(this.clearButton, false);
        this._showBlock(this.undoButton, false);
        this.container.appendChild(this.clearButton);
        this.container.appendChild(this.undoButton);

    }

    _createButton ({text, className, onClick}) {
        const button = document.createElement('button');
        button.className = className;
        button.addEventListener('click', onClick);
        button.appendChild(document.createTextNode(text));
        return button;
    }

    _handleClearClick = () => {
        this.onClearClick();
    }

    _handleUndoClick = () => {
        this.onUndoClick();
    }


    /*eslint-disable no-param-reassign*/
    _showBlock (block, show) {
        if (show) {
            block.style.display = 'block';
            return;
        }
        block.style.display = 'none';
    }
    /*eslint-enable no-param-reassign*/

    showHistory (history) {
        const showClear = history && history.length;
        this._showBlock(this.clearButton, showClear);
    }

    showPrevHistory (prevHistory) {
        const showUndo = prevHistory && prevHistory.length;
        this._showBlock(this.undoButton, showUndo);
    }
}

export default HistoryClear;
