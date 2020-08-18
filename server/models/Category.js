const mongoose = require('mongoose');
// 定义模型字段
const schema = new mongoose.Schema({
    name: {
        type: String
    },
    // 添加一个parent分类，不添加的话数据不能传到数据库，更不会发生关联
    // 这里的parent表示该分类为mongodb数据库里面的id
    parent: {
        type: mongoose.SchemaTypes.ObjectId,
        // ref指定关联的一个模型
        ref: 'Category',
    }
});

// 导出mangoose模型
module.exports = mongoose.model('Category', schema)