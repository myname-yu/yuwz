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
    category: [{
        type: mongoose.SchemaTypes.ObjectId,
        // ref指定关联的一个模型
        ref: 'Category',
    }],

    scores: {
        difficult: {
            type: Number,
        },
        skill: {
            type: Number,
        },
        attack: {
            type: Number,
        },
        surviue: {
            type: Number,
        },
    },
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
    itemsA: [{

        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    itemsB: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    usageTips: {
        type: String
    },
    battleTips: {
        type: String
    },
    teamTips: {
        type: String
    },
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