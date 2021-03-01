import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {verifyServeToServe} from '../common/common';

export const bearer = (req: Request, res: Response, next: NextFunction) => {
    // const publicKEY = String('-----BEGIN PUBLIC KEY-----\n' + PUBLIC_KEY + '\n-----END PUBLIC KEY-----').trim();
    const publicKEY = String('-----BEGIN PUBLIC KEY-----\n' + '\n-----END PUBLIC KEY-----').trim();

    const bearerHeader = req.headers['authorization'];
    let payload;
    try {
        payload = JSON.parse(String(req.headers['payload']));
    } catch (e) {
        return res.status(400).json('Missing payload');
    }

    if (typeof bearerHeader !== 'undefined') {
        const splitResult = bearerHeader.split(' ');
        if (splitResult[0] !== 'Bearer') {
            return res.status(400).json('Missing authorization token');
        }
        const token = splitResult[1];

        const response: any = jwt.verify(token, publicKEY, {algorithms: ['RS256']});

        console.log('Auth/' + payload.id === response.id);
        next();
    } else {
        return res.status(403).json('Unauthorized');
    }
};

export const serverToServer = (req: Request, res: Response, next: NextFunction) => {
    try {
        verifyServeToServe(req);
        next();
    } catch (e) {
        return res.status(e.code).json(e.message);
    }
};
export const nodeToServer = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {headers} = req;
        if (!headers || !headers.authorization) {
            // loggingHelper.error("nodeMiddleware", "requestCheck", {headers: headers}, "Missing authorization token");
            return res.status(400).json('Missing authorization token');
        }
        const BISTOX_NODE_SECRET = '123123';
        if (headers.authorization !== BISTOX_NODE_SECRET) {
            // loggingHelper.error("nodeMiddleware",
            //     "requestCheck",
            //     {actualToken: headers.authorization, expectedToken: constant.config.secret.NODE_TOKEN_SECRET.substr(0, 10)},
            //     "Incorrect authorization token");
            return res.status(403).json('Unauthorized');
        }
        return next();
    } catch (e) {
        return res.status(e.code).json(e.message);
    }
};
