module.exports = app => {
    const express = require('express');
    const router = express.Router({
        // 相当于获取一个参数
        mergeParams: true
    });
    // const req.Model = require('../../models/req.Model');
    // 新建分类
    router.post('/', async(req, res) => {
        // 创建动态模型
        const model = await req.Model.create(req.body);
        res.send(model)
    });
    // 分类编辑
    router.put('/:id', async(req, res) => {
        // console.log(req.params.id);
        // console.log(req.body);
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model)
    });
    // 删除分类
    router.delete('/:id', async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body);
        res.send({
                success: true
            })
            // console.log('删除');
    });
    // 分类列表(获取分类的列表)
    router.get('/', async(req, res) => {
        // 联表查询
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            // 用populate方法，表示关联取出parent
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10);
        // console.log(items);
        res.send(items)
    });
    // 点击编辑之后，在编辑分类页显示要编辑的内容
    router.get('/:id', async(req, res) => {
        const model = await req.Model.findById(req.params.id);
        console.log(model);
        res.send(model)
    });
    // 改成动态模型
    app.use('/admin/api/rest/:resource', async(req, res, next) => {
        // inflection将小写的复数形式转换成大写的单数形式
        console.log(req.params.resource)
        const modelName = require('inflection').classify(req.params.resource);
        // req.Model表明的是给请求对象上挂载一个属性
        req.Model = require(`../../models/${modelName}`);
        next();
    }, router);
    // 图片上传功能
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' });
    // upload.single('file'),表示接收单个文件 并且字段名为file
    app.post('/admin/api/upload', upload.single('file'),
        async(req, res) => {
            // 返回一个图片的地址给前台页面
            // console.log(req);
            // console.log(req.file);
            const file = req.file;
            file.url = `http://localhost:3000/uploads/${file.filename}`
            res.send(file)
        })
}