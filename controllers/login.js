const Router = require('koa-router');
const router = new Router();

module.exports = ()=>{
    router.get('/', async (ctx)=>{
        // 登录界面
        await ctx.render('login/login', {title: '登录'});
    });
    return router.routes();
}