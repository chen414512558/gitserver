const Koa = require('koa');
const render = require('koa-swig');
const errhandler = require('koa-errorhandler');
const serve = require('koa-static');
const config = require('./config');
const co = require('co');
const router = require('./controllers');
const rest = require('./middlewares/resful');
const app = new Koa();
app.context.render = co.wrap(render({
    root: config.viewsConf,
    autoescape: true,
    cache: false,
    ext: 'html',
}));

app.use(errhandler());

app.use(serve(config.assetsConf));

app.use(rest.restify());

app.use(router());

app.listen(3000, ()=>{
    console.log('start node gitserver');
});