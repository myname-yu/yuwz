const mongoose = require('mongoose');
// 定义模型字段
const schema = new mongoose.Schema({
    name: {
        type: String
    },
    icon: {
        type: String
    },

});

// 导出mangoose模型
module.exports = mongoose.model('Item', schema)