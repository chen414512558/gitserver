const Koa = require('koa');
const render = require('koa-swig');
const errhandler = require('koa-errorhandler');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const logger = require('koa-logger');
const cookie = require('koa-cookie').default;
const session = require('koa-session');
const db = require('./models');
const redisPool = require('koa-redis-pool');
const convert = require('koa-convert');
const rest = require('./middlewares/rest');
const config = require('./config');
const co = require('co');
const router = require('./controllers');
const app = new Koa();
app.context.render = co.wrap(render({
    root: config.viewsConf,
    autoescape: true,
    cache: false,
    ext: 'html',
}));
app.keys = ['chenzihui'];

app.use(errhandler());
app.use(convert(redisPool(config.redisConf)));
app.use(cookie());
app.use(session({}, app));
app.use(logger());
app.use(bodyParser());
app.use(serve(config.assetsConf));
app.use(rest.restify());
app.use(router(db));

app.listen(3000, ()=>{
    console.log('start node gitserver');
});