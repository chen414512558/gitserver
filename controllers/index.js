const Router = require('koa-router');
const router = new Router();
const loginRouter = require('./login');
const homeRouter = require('./home');

module.exports = (db)=>{
    router.use('/login', loginRouter(db));
    router.use('/', homeRouter(db));
    router.all('*', async (ctx)=>{
        ctx.status = 404;
        ctx.body = '页面没有找到';
    });
    return router.routes();
}