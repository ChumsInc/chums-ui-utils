export default class ChumsError extends Error {
    url?: string;
    debug?: unknown;
    code?: string | number;
    constructor(message: string, url?: string, debug?: unknown, code?: string | number);
}
