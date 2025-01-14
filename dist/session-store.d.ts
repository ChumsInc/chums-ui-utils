export default class SessionStore {
    static clear(): void;
    static getItem<T = unknown>(key: string, defaultValue: T): T;
    static setItem<T = unknown>(key: string, data: T): void;
    static removeItem(key: string): void;
}
