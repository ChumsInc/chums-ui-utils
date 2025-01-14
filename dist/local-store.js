export default class LocalStore {
    static clear() {
        if (!window || !window.localStorage) {
            return;
        }
        window.localStorage.clear();
    }
    static getItem(key, defaultValue) {
        if (!window || !window.localStorage) {
            throw new Error('Could not get item: LocalStorage is not defined');
        }
        const data = window.localStorage.getItem(key);
        if (data === null) {
            return defaultValue;
        }
        try {
            return JSON.parse(data);
        }
        catch (err) {
            if (err instanceof Error) {
                console.log("getItem()", key, err.message);
            }
            return defaultValue;
        }
    }
    static setItem(key, data) {
        if (!window || !window.localStorage) {
            return;
        }
        window.localStorage.setItem(key, JSON.stringify(data));
    }
    static removeItem(key) {
        if (!window || !window.localStorage) {
            return;
        }
        window.localStorage.removeItem(key);
    }
}
