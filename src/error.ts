export default class ChumsError extends Error {
    url?: string;
    debug?: unknown;
    code?: string | number;

    constructor(message: string, url?: string, debug?: unknown, code?: string | number) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.debug = debug;
        this.url = url;
        this.code = code;
    }
}
