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
    // 添加时间戳，这样在录入数据的时候，就有了两个新增字段createdAt（创建日期）以及updatedAt(更新日期)
    timestamps: true
});

// 导出mangoose模型
module.exports = mongoose.model('Article', schema)