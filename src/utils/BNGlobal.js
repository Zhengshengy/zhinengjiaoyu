/*
    全局变量定义初始化
*/
export default function BNGlobalInit() {
    let BN = {};
    if (!process.server) {
        BN = window.BN = {};
    }
    global.$BN = BN;

    if (!String.prototype.includes) {
        /* eslint-disable */
        String.prototype.includes = function(search, start) {
            'use strict';
            if (typeof start !== 'number') {
                start = 0;
            }

            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
        /* eslint-enable */
    }

    // viewport and Layout change
    let _layoutListeners = BN._layoutListeners = [];
    let _sizeListeners = BN._sizeListeners = [];
    let _scrollListeners = BN._scrollListeners = [];
    let _preSize = viewport();
    let _inhouseAds = BN._inhouseAds = {};

    function viewport() {
        if (!process.server) {
            let e = window;
            let a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return { width: e[a + 'Width'], height: e[a + 'Height']};
        }
        else {
            return { width: '800', height: '600' };
        }
    }

    BN.viewport = viewport;

    if (!process.server) {
        BN.mql = window.matchMedia(`(min-width: 767px)`);
        if (BN.mql.addListener) {
            BN.mql.addListener(function(mql) {
                for (let i = 0; i < _layoutListeners.length; i++) {
                    _layoutListeners[i](!BN.mql.matches);
                }
            });
        }
    }

    BN.isMobileLayout = function () {
        return BN.mql && !BN.mql.matches;
        // return viewport().width < 768;
    };

    BN.calcKeynoteHeight = function () {
        if (this.isMobileLayout())
        {
            return (this.viewport().width - 50) * 768 / 1024;
        }
        return Math.max(this.viewport().height - 130, 600);
    };

    BN.addChangeLayoutListener = function (listener) {
        if (listener && typeof (listener) === 'function') {
            _layoutListeners.push(listener);
            return function () {
                this.removeChangeLayoutListener(listener);
            };
        }
        return null;
    };

    BN.removeChangeLayoutListener = function (listener) {
        if (listener) {
            const index = _layoutListeners.indexOf(listener);
            if (index !== -1) {
                _layoutListeners.splice(index, 1);
            }
        }
    };

    BN.addResizeListener = function (listener) {
        if (listener && typeof (listener) === 'function') {
            _sizeListeners.push(listener);
            return function () {
                BN.removeResizeListener(listener);
            };
        }
        return null;
    };

    BN.removeResizeListener = function (listener) {
        if (listener) {
            let index = _sizeListeners.indexOf(listener);
            if (index !== -1) {
                _sizeListeners.splice(index, 1);
            }
        }
    };

    BN.addScrollListener = function (listener) {
        if (listener && typeof (listener) === 'function') {
            _scrollListeners.push(listener);
            return function () {
                this.removeScrollListener(listener);
            };
        }
        return null;
    };

    BN.removeScrollListener = function (listener) {
        if (listener) {
            const index = _scrollListeners.indexOf(listener);
            if (index !== -1) {
                _scrollListeners.splice(index, 1);
            }
        }
    };

    if (!process.server) {
        window.addEventListener('resize', function (e) {
            let vp = viewport();
            let w = vp.width;
            let preWidth = _preSize.width;

            for (let i = 0; i < _sizeListeners.length; i++) {
                _sizeListeners[i](_preSize, vp);
            }
            _preSize = vp;
        });
    }

}