const PORT = process.env.PORT || normalizePort('14000');

const PG = {
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 15432,
    database: process.env.PG_DATABASE || 'bistox-payment',
    username: process.env.PG_USER || 'bistox',
    password: process.env.PG_PASSWORD || 'password',
};

/**
 * Normalize port into a number, string, or false.
 */

export function normalizePort(val: string) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return 0;
}

export {
    PORT,
    PG,
};
