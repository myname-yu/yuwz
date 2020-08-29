const mongoose = require('mongoose');
// 定义模型字段
const schema = new mongoose.Schema({
    title: {
        type: String
    },
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        // ref指定关联的一个模型
        ref: 'Category',
    }],
    body: {
        type: String
    },
}, {
    timestamps: true
});

// 导出mangoose模型
module.exports = mongoose.model('Article', schema)