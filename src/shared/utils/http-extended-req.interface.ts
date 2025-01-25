import { Request } from 'express';

export interface ExtendedRequest extends Request {
    sub?: {
        username: string,
        isAdmin: boolean,
        tokenId: string
    };
}