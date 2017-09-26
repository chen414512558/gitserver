const Router = require('koa-router');
const shell = require('shelljs');
const router = new Router();

module.exports = ()=>{
    router.get('/', async (ctx)=>{
        await ctx.render('home/index', {title: '主页'});
    });
    router.get('gitInfo', async (ctx)=>{
        let infos = shell.exec('git branch -a');
        let rets = {};
        infos = infos.split('\n  ');
        infos.forEach(info=>{
            if (info.startsWith('remotes/origin/')) {
                // info.substring()
            }
        });
        ctx.rest(rets);
    });
    return router.routes();
};