
// Vue应用程序的主入口文件
// 负责创建Vue应用实例、配置路由和全局属性

// 导入主题变量CSS文件，包含所有主题的CSS变量定义
import './themes/generated/variables.css';

// 从Vue核心包导入createApp函数，用于创建Vue应用实例
import { createApp } from 'vue';
// 导入路由配置
import router from './router';

// 导入根组件
import App from './App.vue';
// 导入应用信息配置
import appInfo from "./app-info";

// 创建Vue应用实例，传入根组件App
const app = createApp(App);

// 安装Vue Router插件，使应用支持路由功能
app.use(router);

// 将应用信息对象挂载到全局属性上，所有组件都可以通过this.$appInfo访问
app.config.globalProperties.$appInfo = appInfo;

// 将Vue应用挂载到DOM中id为'app'的元素上
app.mount('#app');
