export default class LocalStore {
    static clear():void {
        if (!window || !window.localStorage) {
            return;
        }
        window.localStorage.clear();
    }

    static getItem<T = unknown>(key:string, defaultValue: T):T {
        if (!window || !window.localStorage) {
            throw new Error('Could not get item: LocalStorage is not defined');
        }
        const data = window.localStorage.getItem(key);
        if (data === null) {
            return defaultValue;
        }
        try {
            return JSON.parse(data);
        } catch(err:unknown) {
            if (err instanceof Error) {
                console.log("getItem()", key, err.message);
            }
            return defaultValue;
        }
    }

    static setItem<T = unknown>(key:string, data:T):void {
        if (!window || !window.localStorage) {
            return;
        }
        window.localStorage.setItem(key, JSON.stringify(data));
    }

    static removeItem(key:string):void {
        if (!window || !window.localStorage) {
            return;
        }
        window.localStorage.removeItem(key);
    }
}
