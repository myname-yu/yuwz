module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const Category = require('../../models/Category');
    // 新建分类
    router.post('/categories', async(req, res) => {
        const model = await Category.create(req.body);
        res.send(model)
    });
    // 列表编辑
    router.put('/categories/:id', async(req, res) => {
        const model = await Category.findOneAndUpdate(req.params.id, req.body);
        res.send(model)
    });
    // 分类列表
    router.get('/categories', async(req, res) => {
        const items = await Category.find().limit(10);
        res.send(items)
    });
    // 点击编辑之后，在编辑分类页显示要编辑的内容
    router.get('/categories/:id', async(req, res) => {
        const model = await Category.findById(req.params.id);
        res.send(model)
    });
    // 删除分类
    router.delete('/categories/:id', async(req, res) => {
        // await Category.findByIdAndDelete(req.params.id, req.body);
        // res.send({
        //     success: true
        // })
        console.log('删除');
    });
    app.use('/admin/api', router)
}