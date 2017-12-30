const Router = require('koa-router');
const shell = require('shelljs');
const authUser = require('../middlewares/auth');
const router = new Router();

module.exports = (db)=>{
    router.get('/', async (ctx)=>{
        await ctx.render('home/index', {title: '主页', username: ctx.session.user? ctx.session.user.username: ''});
    });
    router.get('gitInfo', async (ctx)=>{
        let infos = shell.exec('git branch -a').stdout;
        let head = '';
        let res = {
            head: '',
            content: [],
        };
        infos = infos.split('\n  ');
        infos.forEach((info, index)=>{
            let length = info.length;
            if (index == infos.length - 1) {
                length -= 1;
            }
            if (info.startsWith('remotes/origin/')) {
                if (!head && info.includes('HEAD')) {
                    head = info.substring(30, length);
                }
                if (head && info.includes(head)) {
                    res.head = info.substring(15, length);
                } else {
                    res.content.push(info.substring(15, length));
                }
            }
        });
        ctx.rest(res);
    });

    router.post('createGit', authUser, (ctx)=>{
        let name = ctx.request.body.username;
        shell.exec(`git checkout -b ${name}`);
        shell.exec('git add -A');
        shell.exec('git commit -m "初始化"');
        shell.exec(`git push origin ${name}`);
        ctx.rest('');
    });
    return router.routes();
}
