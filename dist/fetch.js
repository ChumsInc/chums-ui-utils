import ChumsError from "./error.js";
export async function handleJSONResponse(res) {
    if (!res.ok) {
        const text = await res.text();
        return Promise.reject(new Error(text, { cause: { code: res.status, statusText: res.statusText } }));
    }
    try {
        const json = await res.json();
        if (json.error) {
            console.warn(json.error);
            return Promise.reject(new Error(json.error, { cause: { code: res.status, statusText: res.statusText } }));
        }
        return json ?? null;
    }
    catch (err) {
        if (err instanceof Error) {
            console.debug("handleJSONResponse()", err.message);
            return Promise.reject(err);
        }
        console.debug("handleJSONResponse()", err);
        return Promise.reject(new Error('Error in handleJSONResponse()'));
    }
}
export async function allowErrorResponseHandler(res) {
    try {
        if (!res.ok) {
            const text = res.statusText ?? await res.text();
            return Promise.reject(new ChumsError(text, res.url, null, res.status));
        }
        return await res.json();
    }
    catch (err) {
        if (err instanceof Error) {
            console.debug("allowErrorResponseHandler()", err.message);
            return Promise.reject(err);
        }
        console.debug("allowErrorResponseHandler()", err);
        return Promise.reject(new Error('Error in allowErrorResponseHandler()'));
    }
}
export async function fetchJSON(url, options = {}, responseHandler) {
    try {
        options.headers = new Headers(options.headers);
        if (!options.method) {
            options.method = 'GET';
        }
        options.headers.append('Accept', 'application/json');
        if (!options.credentials) {
            options.credentials = 'same-origin';
        }
        if (!!options?.method && ['POST', 'PUT'].includes(options.method.toUpperCase())) {
            if (!options.headers.get('Content-Type')) {
                options.headers.set('Content-Type', 'application/json');
            }
        }
        const res = await fetch(url, options);
        if (responseHandler) {
            return responseHandler(res);
        }
        return await handleJSONResponse(res);
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("fetchJSON()", err.message);
            return Promise.reject(err);
        }
        console.error("fetchJSON()", err);
        if (typeof err === 'string') {
            return Promise.reject(new Error(err));
        }
        return Promise.reject(err);
    }
}
export async function fetchHTML(url, options = {}) {
    try {
        options.headers = new Headers(options.headers);
        if (!options.method) {
            options.method = 'GET';
        }
        if (!options.credentials) {
            options.credentials = 'same-origin';
        }
        if (!!options?.method && ['POST', 'PUT'].includes(options.method.toUpperCase())) {
            if (!options.headers.get('Content-Type')) {
                options.headers.set('Content-Type', 'application/json');
            }
        }
        options.headers = new Headers(options.headers);
        const res = await fetch(url, options);
        if (!res.ok) {
            const text = await res.text();
            return Promise.reject(new Error(text, { cause: { code: res.status, statusText: res.statusText } }));
        }
        return await res.text();
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("fetchHTML()", err.message);
            return Promise.reject(err);
        }
        console.error("fetchHTML()", err);
        if (typeof err === 'string') {
            return Promise.reject(new Error(err));
        }
        return Promise.reject(err);
    }
}
