'use strict';

const DEFAULT_PARAMS = {
    screenSize: {
        normalScreenWidth: 1200,
    },
};

class WindowSize {

    constructor (p = DEFAULT_PARAMS) {

        const {
            screenSize,
        } = p;

        this.screenSize = screenSize;

        this.calcWinWidth();
        this.watchWindow();
    }

    getScreenParams () {
        return {
            isSmallScreen: this.isSmallScreen,
        }
    }

    calcWinWidth = () => {
        this.isSmallScreen = window.innerWidth < this.screenSize.normalScreenWidth;
    }

    watchWindow () {
        window.addEventListener('resize', this.calcWinWidth);
    }

}

const windowSize = new WindowSize();

export default windowSize;
