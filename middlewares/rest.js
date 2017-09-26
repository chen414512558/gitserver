'use strict';
module.exports = {
    restify: () => {
        return async (ctx, next) => {
            if (ctx.request.header['x-requested-with']) {
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.body = JSON.stringify({
                        code: 0,
                        message: 'success',
                        data
                    });
                }
                try {
                    await next();
                } catch (e) {
                    if (e.code) {
                        ctx.response.type = 'application/json';
                        ctx.response.body = JSON.stringify({
                            code: e.code || 'internal:unknown_error',
                            message: e.message || ''
                        });
                    } else {
                        throw e;
                    }
                }
            } else {
                await next();
            }
        };
    }
};