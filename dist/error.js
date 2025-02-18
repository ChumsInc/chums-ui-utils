export default class ChumsError extends Error {
    url;
    debug;
    code;
    constructor(message, url, debug, code) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.debug = debug;
        this.url = url;
        this.code = code;
    }
}
