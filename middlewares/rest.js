'use strict';
module.exports = {
    restify: () => {
        return async (ctx, next) => {
            let isAjax = ctx.request.header['x-requested-with'];
            if (isAjax) {
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
                    if (e.code && isAjax) {
                        ctx.status = 200;
                        ctx.response.type = 'application/json';
                        ctx.response.body = JSON.stringify({
                            code: e.code,
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