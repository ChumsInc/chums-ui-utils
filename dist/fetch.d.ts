export type ResponseHandler = <T = unknown>(res: Response) => Promise<T>;
export declare function handleJSONResponse<T = unknown>(res: Response): Promise<T | null>;
export declare function allowErrorResponseHandler<T = unknown>(res: Response): Promise<T>;
export declare function fetchJSON<T = unknown>(url: string, options?: RequestInit, responseHandler?: ResponseHandler): Promise<T | null>;
export declare function fetchHTML(url: string, options?: RequestInit): Promise<string | undefined>;
