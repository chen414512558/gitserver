const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

// 加密
function sha256(pwd) {
    if (pwd) {
        return crypto.createHash('sha256').update(pwd).digest('hex');
    }
    return '';
}


let GitUserSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: [4, '用户名长度必须在4-20位'],
        max: [20, '用户名长度必须在4-20位'],
    },
    password: {type: String, required: true},
});

GitUserSchema.statics.login = function ({username, password}){
    return new Promise(async (rev, rej) => {
        password = sha256(password);
        let User = this.model('GitUser');
        let tuser = new User({username, password});
        let err = tuser.validateSync();
        if (err) {
            rej({code: 2, message: err});
        }
        let user = await User.findOne({username, password});
        if (user) {
            rev(user);
        } else {
            rej({code: 2, message: '用户名或者密码错误'});
        }
    });
};

GitUserSchema.statics.regist = function ({username, password}){
    return new Promise(async (rev, rej) => {
        let GitUser = this.model('GitUser');
        let user = await GitUser.findOne({username});
        if (!user) {
            password = sha256(password);
            user = new GitUser({username, password});
            await user.save();
            rev(user);
        } else {
            rej({code: 2, message: '用户已经被注册'});
        }
    });
};

module.exports = (db)=>{
    let gitUserModel = db.model('GitUser', GitUserSchema);
    return gitUserModel;
}