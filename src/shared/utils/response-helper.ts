import { IHttpResponse } from './utility.const';

/**
 * Sends a standardized response.
 * @param res - The response object from NestJS.
 * @param statusCode - The HTTP status code.
 * @param message - The message to include in the response.
 * @param data - The data to include in the response (optional).
 */
export function sendResponse<T>(
    res: any,
    statusCode: number,
    message?: string,
    data?: T
): void {
    const response: IHttpResponse<T> = {
        message,
        data,
    };
    res.status(statusCode).json(response);
}
