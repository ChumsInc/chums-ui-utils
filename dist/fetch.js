/**
 * Created by steve on 8/24/2016.
 */
export async function allowErrorResponseHandler(res) {
    try {
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
export async function handleJSONResponse(res) {
    if (!res.ok) {
        const text = await res.text();
        return Promise.reject(new Error(text, { cause: { code: res.status, statusText: res.statusText } }));
    }
    const json = await res.json();
    if (json.error) {
        console.warn(json.error);
        return Promise.reject(new Error(json.error, { cause: { code: res.status, statusText: res.statusText } }));
    }
    return json ?? null;
}
export async function fetchJSON(url, options = {}, responseHandler) {
    try {
        if (!!options?.method && ['POST', 'PUT'].includes(options.method.toUpperCase())) {
            const headers = options?.headers || {};
            if (options?.headers) {
                delete options.headers;
            }
            options.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...headers,
            };
        }
        const res = await fetch(url, { credentials: 'same-origin', ...options });
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
        const res = await fetch(url, { credentials: 'same-origin', ...options });
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
