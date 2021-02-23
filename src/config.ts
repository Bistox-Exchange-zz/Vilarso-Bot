const PORT = process.env.PORT || normalizePort('14000');
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'RANDOMSALT';
const PRIVATE_KEY = process.env.PRIVATE_KEY || 'RANDOMSALT';
// tslint:disable-next-line:max-line-length
const BISTOX_CREATE_WITHDRAWAL_URL = process.env.BISTOX_CREATE_WITHDRAWAL_URL || 'https://devplatform.bistox.com/api/games/createWithdrawal';
const BISTOX_GENERATE_ADDRESS = process.env.BISTOX_GENERATE_ADDRESS || 'https://devplatform.bistox.com/api/games/createAddress';
const BISTOX_PLATFORM_SECRET = process.env.BISTOX_PLATFORM_SECRET || 'Basic cGxhdGZvcm06KjZIZDk4M0hES0hGSA==';
const BISTOX_NODE_SECRET = process.env.BISTOX_NODE_SECRET || 'Basic cGxhdGZvcm06KjZIZDk4M0hES0hGSA==';
const MS_MASTER_CREDIT_URL = process.env.MS_MASTER_CREDIT_URL || 'MS_MASTER_URL/api/user/credit';
const MS_MASTER_CANCEL_WITHDRAW_URL = process.env.MS_MASTER_CANCEL_WITHDRAW_URL || '{ms_master_url}/api/user/withdraw/canceled';

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
    PUBLIC_KEY,
    PG,
    PRIVATE_KEY,
    BISTOX_CREATE_WITHDRAWAL_URL,
    BISTOX_GENERATE_ADDRESS,
    BISTOX_PLATFORM_SECRET,
    BISTOX_NODE_SECRET,
    MS_MASTER_CREDIT_URL,
    MS_MASTER_CANCEL_WITHDRAW_URL,
};
