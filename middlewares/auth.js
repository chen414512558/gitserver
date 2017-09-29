module.exports = (ctx, next)=>{
    if (ctx.session.user) {
        next();
    } else if (ctx.cookie.user) {
        ctx.session.user = ctx.cookie.user;
        next();
    } else {
        if (ctx.request.header['x-requested-with']) {
            throw {code: 10, message: '/login'};
        } else {
            ctx.redirect('/login');
        }

    }
};