'use strict';
module.exports = {
    restify: () => {
        return async (ctx, next) => {
            ctx.rest = (data) => {
                ctx.response.type = 'application/json';
                ctx.body = JSON.stringify({
                    code: 0,
                    message: 'success',
                    data
                });
            }
            if (ctx.request.method == 'POST') {
                try {
                    await next();
                } catch (e) {
                    // console.log('Process API error...');
                    // ctx.response.status = 400
                    console.log('rest', e);
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