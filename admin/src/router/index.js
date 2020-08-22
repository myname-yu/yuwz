import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Main from "../views/Main.vue";
import CategoryEdit from "../views/CategoryEdit.vue";
import CategoryList from "../views/CategoryList.vue";
import ItemEdit from "../views/ItemEdit.vue";
import ItemList from "../views/ItemList.vue";
import HeroEdit from "../views/HeroEdit.vue";
import HeroList from "../views/HeroList.vue";
import ArticleEdit from "../views/ArticleEdit.vue";
import ArticleList from "../views/ArticleList.vue";
Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Main",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Main,
        children: [
            // 分类路由
            { path: "/categories/create", component: CategoryEdit },
            { path: "/categories/list", component: CategoryList },
            {
                path: "/categories/edit/:id",
                component: CategoryEdit,
                // 这里的props:true表示把该路由下的url所携带的参数都注入到CategoryEdit组件中，
                // 另外，在组建CategoryEdit组件中，要用props来接收来自这里的参数，解耦合，减去了很多步骤
                props: true,
            },
            // 物品路由
            { path: "/items/create", component: ItemEdit },
            { path: "/items/list", component: ItemList },
            { path: "/items/edit/:id", component: ItemEdit, props: true },
            //英雄路由
            { path: "/heroes/create", component: HeroEdit },
            { path: "/heroes/list", component: HeroList },
            { path: "/heroes/edit/:id", component: HeroEdit, props: true },

            //文章路由
            { path: "/articles/create", component: ArticleEdit },
            { path: "/articles/list", component: ArticleList },
            { path: "/articles/edit/:id", component: ArticleEdit, props: true },
        ],
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;