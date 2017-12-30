const Router = require('koa-router');
const r = new Router();
const validator = require('validator');

function saveLogin(user, ctx) {
    ctx.session.user = user;
    ctx.cookie.user = user;
}

module.exports = (db)=>{
    let User = db.User;
    r.get('/', async (ctx)=>{
        // 登录界面
        await ctx.render('login/login', {title: '登录'});
    });
    // 登录操作
    r.post('/', async (ctx)=>{
        let password = ctx.request.body.password;
        let errmsg = '';
        if (!validator.isLength(password, {min: 6, max: 18})) {
            errmsg = '密码长度必须在6-18位之间';
        }
        if (!errmsg) {
            let user = await User.login(ctx.request.body);
            saveLogin(user, ctx);
            ctx.rest(user);
        } else {
            throw {code: 2, message: errmsg};
        }
    });
    r.post('/regist', async (ctx)=>{
        let password = ctx.request.body.password;
        let errmsg = '';
        if (!validator.isLength(password, {min: 6, max: 18})) {
            errmsg = '密码长度必须在6-18位之间';
        }
        if (!errmsg) {
            let user = await User.regist(ctx.request.body);
            saveLogin(user, ctx);
            ctx.rest(user);
        } else {
            throw {code: 2, message: errmsg};
        }
    });
    return r.routes();
}