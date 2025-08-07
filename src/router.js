// Vue Router路由配置文件
// 定义应用的所有路由规则、页面布局和身份验证逻辑

// 导入身份验证服务
import auth from "./auth";

// 从Vue Router导入路由创建函数和历史模式
import { createRouter, createWebHashHistory } from "vue-router";
// 导入Vue的响应式引用函数
import {  ref } from 'vue';

// 导入页面组件
import Home from "./views/home-page.vue";
import Tasks from "./views/tasks-page.vue";

// 导入布局组件
import defaultLayout from "./layouts/side-nav-outer-toolbar.vue"; // 默认布局：侧边导航+外部工具栏
import simpleLayout from "./layouts/single-card.vue"; // 简单布局：单卡片（用于登录页）

// 导入本地化函数
import { loadLocalMsg } from './localization/localization'

// 创建响应式的登录页面标题，支持多语言
export const msgRouterLoginTitle = ref(loadLocalMsg('login-form-login-title'));

// 动态导入视图组件的函数，支持代码分割和懒加载
function loadView(view) {
    return () => import(`./views/${view}.vue`)
}

// 创建路由器实例
const router = new createRouter({
    // 定义路由配置数组
    routes: [
        {
            // 首页路由
            path: "/home",
            name: "home",
            meta: {
                requiresAuth: true,        // 需要身份验证
                layout: defaultLayout      // 使用默认布局
            },
            component: Home               // 绑定首页组件
        },
        {
            // 登录表单路由
            path: "/login-form",
            name: "login-form",
            meta: {
                requiresAuth: false,      // 不需要身份验证
                layout: simpleLayout,     // 使用简单布局
                title: msgRouterLoginTitle // 页面标题（支持本地化）
            },
            component: loadView("login-form") // 懒加载登录组件
        },
        {
            // 根路径重定向到首页
            path: "/",
            redirect: "/home"
        },
        {
            // 404页面处理，所有未匹配的路径都重定向到首页
            path: "/:pathMatch(.*)*",
            redirect: "/home"
        },
        {
            // 任务页面路由（测试用页面）
            path: "/tasks",
            name: "tasks",
            meta: {
                requiresAuth: true,       // 需要身份验证
                layout: defaultLayout     // 使用默认布局
            },
            component: Tasks              // 绑定任务页面组件
        }
    ],
    // 使用Hash模式的历史记录管理（URL中带#符号）
    history: createWebHashHistory()
});

// 全局前置路由守卫，在每次路由跳转前执行
router.beforeEach((to, from, next) => {
    
    // 如果用户已登录但试图访问登录页，重定向到首页
    if (to.name === "login-form" && auth.loggedIn()) {
        next({ name: "home" });
    }

    // 检查目标路由是否需要身份验证
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 如果需要身份验证但用户未登录，重定向到登录页
        if (!auth.loggedIn()) {
            next({
                name: "login-form",
                query: { redirect: to.fullPath } // 保存原始目标路径，登录后可跳转回来
            });
        } else {
            // 用户已登录，允许访问
            next();
        }
    } else {
        // 不需要身份验证的路由，直接通过
        next();
    }
});

// 导出路由器实例
export default router;