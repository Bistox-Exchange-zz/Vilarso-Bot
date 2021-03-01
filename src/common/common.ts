import * as crypto from 'crypto';
import {Request} from 'express';
const PRIVATE_KEY = '123';

function checkServeToServe(request: Request) {
    try {
        const hmac = crypto.createHmac('SHA256', PRIVATE_KEY);
        const computedHashSignature = hmac.update(JSON.stringify(request.body)).digest('hex');
        const expectedHashSignature = request.headers['x-sha2-signature'];
        if (computedHashSignature !== expectedHashSignature) {
            throw new Error('Webhook hash signature mismatch');
        }
    } catch (err) {
        console.log('checkServeToServe', err);
        throw err;
    }
}

export function sign(body: any): string {
    try {
        const hmac = crypto.createHmac('SHA256', PRIVATE_KEY);
        return hmac.update(JSON.stringify(body)).digest('hex');
    } catch (e) {
        console.error('cant sign payload', e);
        throw e;
    }
}

export function verifyServeToServe(req: Request) {
    try {
        checkServeToServe(req);
    } catch (err) {
        console.log('verifyServeToServe', err);
        throw {
            code : 304,
            message : 'Forbidden Access',
        };
    }
}

export const delay = (ms: any) => new Promise((res: any) => setTimeout(res, ms));
export const currenciesMap: Map<string, string> = new Map([
    ['ETH', '5e19cb2b344f700e0e530023'],
    ['BSX', '5f6df2f7022cb5f49a2f7774'],
    ['BTC', '5e77d9c71c9d4400009f56ac'],

    ['eth', '5e19cb2b344f700e0e530023'],
    ['bsx', '5f6df2f7022cb5f49a2f7774'],
    ['btc', '5e77d9c71c9d4400009f56ac'],
]);
