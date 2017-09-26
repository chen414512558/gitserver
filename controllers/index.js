const Router = require('koa-router');
const router = new Router();
const loginRouter = require('./login');
const homeRouter = require('./home');

module.exports = ()=>{
    router.use('/login', loginRouter());
    router.use('/', homeRouter());
    router.all('*', async (ctx)=>{
        ctx.status = 404;
        ctx.body = '页面没有找到';
    });
    return router.routes();
}