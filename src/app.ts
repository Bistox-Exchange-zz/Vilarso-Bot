import 'reflect-metadata';
import './ioc/loader';

import * as bodyParser from 'body-parser';
import cors = require('cors');
import * as Debug from 'debug';
import * as express from 'express';
import * as createError from 'http-errors';
import * as path from 'path';
import {PORT} from './config';
import {server} from './server';

server.setConfig((_app: any) => {
    _app.set('port', PORT);
    // this.app.set("env", "development");
    _app.use(cors());
    _app.use(bodyParser.json());
    _app.use(express.static(path.join(__dirname, '../public'), {maxAge: 31557600000}));
    console.log('Configuration set');
})
    .setErrorConfig((_app: any) => {
        // catch 404 and forward to error handler
        _app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            next(createError(404));
        });

        // error handlers
        // development error handler
        // will print stacktrace
        if (_app.get('env') === 'development') {
            _app.use((err: createError.HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
                console.log(err);
                res.status(err.status || 500);
                res.json({
                    status: err.status,
                    message: err.message,
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user
        _app.use((err: createError.HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log(err);
            res.status(err.status || 500);
            res.json({
                error: {},
                message: err.message,
            });
        });
        console.log('Error configuration set');
    });

const app = server.build();
app.listen(app.get('port'), () => {
    console.log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
    console.log('Press CTRL-C to stop');
});

export {app};
