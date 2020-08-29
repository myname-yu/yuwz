module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Category = mongoose.model('Category');
    const Article = mongoose.model('Article')
    router.get('/news/init', async (req, res) => {
        //  获取分类里面的数据，lean()表示获取的是json对象
        const cats = await Category.find().lean();
        // $$('.news_list .title').map(el=>el.innerHTML)在浏览器获取对应的数据
        const newsTitles = ["8月26日七夕“为爱向前冲”活动维护完成公告", "8月26日外挂专项打击公告", "8月26日“演员”惩罚名单", "8月26日净化游戏环境声明及处罚公告", "8月26日体验服停机更新公告", "稷下学院聚餐，星辰小伙用成员付账？", "王者荣耀X稻香村：中秋来王者峡谷赏月品稻香", "联手“乞巧”非遗，《王者荣耀》缔造数字“情人节”", "缘起峡谷，情定七夕 | 我所爱的，都在王者峡谷里", "听说，小妲己偷偷从峡谷溜去云南了？"];
        const newsList = newsTitles.map(title => {
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5);
            console.log(randomCats);
            return {
                categories: randomCats.slice(0, 2),
                title: title
            }
        })

        // console.log(newsList);
        res.send(newsList)
    })
    app.use('/web/api', router)
}