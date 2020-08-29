module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.set('useFindAndModify', false)
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err
    })
    // npm i require-all插件可以把一个目录里面所有文件都引入就来
    require('require-all')(__dirname + '/../models')

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        // we're connected!
        console.log('数据库连接成功');
    });
}

