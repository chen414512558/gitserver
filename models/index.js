const mongoose = require('mongoose');
const db = mongoose.createConnection('47.95.238.142', 'czh', {
    db: { native_parser: true },
    server: { poolSize: 5 },
    user: 'czh',
    pass: 'czh0527'
});
db.on('error', (err)=>{
    console.log('数据库连接出错', err);
    process.exit(1);
})
db.once('open', ()=>{
    console.log('打开数据库一次');
});

module.exports = {
    User: require('./gituser')(db),
}