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
        // type: mongoose.Schema.Types.ObjectId,
        // ref指定关联的一个模型
        ref: 'Category',
    }
});

schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

schema.virtual('newsList', {
    localField: '_id',
    // foreignField外键
    foreignField: 'categories',
    justOne: false,
    // 关联的是Article
    ref: 'Article'
})
// 导出mangoose模型
module.exports = mongoose.model('Category', schema)