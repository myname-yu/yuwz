const mongoose = require("mongoose");
// 定义模型字段
const schema = new mongoose.Schema({
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    title: {
        type: String,
    },
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        // ref指定关联的一个模型
        ref: 'Category',
    }],

    scores: {
        difficult: {
            type: Number,
        },
        skills: {
            type: Number,
        },
        attack: {
            type: Number,
        },
        survive: {
            type: Number,
        },
    },
    // 技能
    skills: [{
        icon: {
            type: String,
        },
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        tips: {
            type: String,
        },
    }],
    // 顺风出装
    itemsTail: [{

        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    // 逆风出装
    itemsHead: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    // 使用技巧
    usageTips: {
        type: String
    },
    // 对抗技巧
    battleTips: {
        type: String
    },
    // 团战思路
    teamTips: {
        type: String
    },
    //最佳搭档
    partners: [{
        hero: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'hero'
        },
        description: {
            type: String
        }
    }]
});

// 导出mangoose模型
module.exports = mongoose.model("Hero", schema);