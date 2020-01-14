/*
    辅助功能封装，Cookie读写等
*/

import Cookies from 'js-cookie';

export default {
    isClientSideRender: function() {
        return typeof window !== 'undefined';
    },
    domain: function () {
        return "https://aiedu.snhccm.com/"

    },
    createCookie: function(key, value, exp) {
        if (process.server) {
            return;
        }
        if (exp >= 0) {
            Cookies.set(key, value, { expires: exp });
        } else {
            Cookies.set(key, value);
        }
    },
    readCookie: function(key) {
        if (process.server) {
            return;
        }
        return Cookies.get(key);
    },
    isArray: function(arg) {
        if (typeof arg === 'object') {
            return Object.prototype.toString.call(arg) === '[object Array]';
        }
        return false;
    },
    deleteCookie: function(key) {
        if (process.server) {
            return;
        }
        Cookies.remove(key);
    },
    isQuotaExceeded: function(e) {
        let quotaExceeded = false;
        if (e) {
            if (e.code) {
                switch (e.code) {
                    case 22:
                        quotaExceeded = true;
                        break;
                    case 1014:
                        // Firefox
                        if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            quotaExceeded = true;
                        }
                        break;
                }
            } else if (e.number === -2147024882) {
                // Internet Explorer 8
                quotaExceeded = true;
            }
        }
        return quotaExceeded;
    },
    // Check for native support
    storageAvailable: function(type) {
        try {
            if (process.server) {
                return false;
            }
            let storage = window[type];
            let x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return false;
        }
    },

    sessionStorageWith: function(key, value) {
        return this.storageWith('sessionStorage', key, value);
    },
    localStorageWith: function(key, value) {
        return this.storageWith('localStorage', key, value);
    },
    increaseStorageWith: function(key) {
        let tmpValue = this.localStorageWith(key);
        tmpValue = tmpValue ? tmpValue + 1 : 1;
        this.localStorageWith(key,tmpValue);
        return tmpValue;
    },
    storageWith: function(type, key, value) {
        if (process.server) {
            return;
        }
        const storage = window[type];
        let lsSupport = false;
        if (this.storageAvailable(type)) {
            lsSupport = true;
        }

        if (typeof value !== 'undefined' && value !== null) {
            if (typeof value === 'object') {
                /* eslint-disable */
                value = JSON.stringify(value);
                /* eslint-enable */
            }
            if (lsSupport) { // Native support
                try {
                    storage.setItem(key, value);
                } catch (e) {
                    if (this.isQuotaExceeded(e)) {
                        console.log('If you\'re in private mode, please use browser with normal mode. ');
                    } else {
                        console.log('Something is wrong, please refresh page.');
                    }
                }
            } else { // Use Cookie
                this.createCookie(key, value, 30);
            }
        }

        // No value supplied, return value
        let data;
        if (typeof value === 'undefined') {
            // Get value
            if (lsSupport) { // Native support
                data = storage.getItem(key);
            } else { // Use cookie
                data = this.readCookie(key);
            }
            try {
                data = JSON.parse(data);
            } catch (e) {
                /* eslint-disable */
                data = data; // do nothing
                /* eslint-enable */
            }
            return data;
        }

        // Null specified, remove store
        if (value === null) {
            if (lsSupport) {
                storage.removeItem(key);
            } else {
                this.createCookie(key, '', -1);
            }
        }
    },
    readValueFromCookie: function(req, key) {
        if (!req.headers.cookie) {
            return;
        }
        let nameEQ = `${key}=`;
        let ca = req.headers.cookie.split(';');
        for (let i = 0, max = ca.length; i < max; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return;
    },
    readValueFromLocalStorage: function(key) {
        return this.localStorageWith(key);
    },
    setKeyValue: function(key, value, exp = 30) {
        if (process.server) {
            return;
        }
        if (exp > 0) {
            this.localStorageWith(key, value);
        }
        this.createCookie(key, value, exp);
    },
    getKeyValue: function(key, req, fromCookie = false) {
        if (fromCookie) {
            if (req) {
                return this.readValueFromCookie(req, key);
            } else {
                return this.readCookie(key);
            }
        }
        else if (process.server && req) {
            return this.readValueFromCookie(req, key);
        } else {
            return this.readValueFromLocalStorage(key);
        }
    },
    clearKeyValue: function(key) {
        if (process.server) {
            return;
        }
        this.deleteCookie(key);
        this.localStorageWith(key, null);
    },
    setUserName: function(name) {
        const key = 'user_name';
        this.setKeyValue(key, name);
    },
    getUserName: function(req) {
        const key = 'user_name';
        return this.getKeyValue(key, req);
    },
    clearUserName: function() {
        const key = 'user_name';
        this.clearKeyValue(key);
    },
    setUserToken: function(token) {
        const key = 'authorization';
        this.setKeyValue(key, `Bearer ${token}`, -1);
    },
    getUserToken: function(req) {
        const key = 'authorization';
        return this.getKeyValue(key, req, true);
    },
    clearUserToken: function() {
        const key = 'authorization';
        this.clearKeyValue(key);
    },
    setUserRole: function(role) {
        const key = 'user_role';
        this.setKeyValue(key, role);
    },
    getUserRole: function(req) {
        const key = 'user_role';
        return parseInt(this.getKeyValue(key, req), 10);
    },
    clearUserRole: function() {
        const key = 'user_role';
        this.clearKeyValue(key);
    },
    getUserRoomId: function() {
        const key = 'room_id';
        return this.getKeyValue(key);
    },
    setUserRoomId: function(room_id) {
        const key = 'room_id';
        this.setKeyValue(key, room_id);
    },
    clearUserRoomId: function() {
        const key = 'room_id';
        this.clearKeyValue(key);
    },
    screen: function() {
        if (!process.server) {
            let e = window;
            let a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }

            let mql = window.matchMedia(`(orientation: portrait)`);

            return { width: e[a + 'Width'], height: e[a + 'Height'], orientation: (mql && mql.matches ? 0 : 1) };
        }
        else {
            return { width: '800', height: '600', orientation: 0 };
        }
    },
    buildExerciseImages: function (baseUrl, image_count) {
        image_count || (image_count = 1);

        let result = [];
        for (let i = 1; i <= image_count; i++)
        {
            // let image = i < 10 ? '00' : (i < 100 ? '0' : '');
            // `${baseUrl}/${aq}/${image}${i}.jpeg`,

            result.push({
                src: `${baseUrl}/${i}`,
                w: 1024,
                h: 768
            });
        }
        return result;
    }
};