export default class SessionStore {
    static clear() {
        if (!window || !window.sessionStorage) {
            return;
        }
        window.sessionStorage.clear();
    }
    static getItem(key, defaultValue) {
        if (!window || !window.sessionStorage) {
            throw new Error('Could not get item: SessionStorage is not defined');
        }
        const data = window.sessionStorage.getItem(key);
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
        if (!window || !window.sessionStorage) {
            return;
        }
        window.sessionStorage.setItem(key, JSON.stringify(data));
    }
    static removeItem(key) {
        if (!window || !window.sessionStorage) {
            return;
        }
        window.sessionStorage.removeItem(key);
    }
}
