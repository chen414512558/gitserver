const path = require('path');

module.exports = {
    viewsConf: path.join(__dirname, '../views'),
    assetsConf: path.join(__dirname, '../assets'),
    sessionConf: {

    },
    redisConf: {
        host: '127.0.0.1',
        port: 6379,
        max: 75,
        min: 1,
        timeout: 3000,
        log: false,
        db: 0
    }
}