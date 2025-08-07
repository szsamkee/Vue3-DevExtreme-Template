<!-- Vue应用根组件
     负责整个应用的顶层结构、布局管理和响应式设计
     所有页面组件都会在这个根组件内渲染 -->
<template>
  <!-- 应用根容器，设置固定ID用于CSS样式定位 -->
  <div id="root">
    <!-- 应用主体容器，应用响应式CSS类 -->
    <div :class="cssClasses">
      <!-- 动态布局组件容器
           根据路由的meta.layout属性渲染不同的布局组件
           支持侧边导航布局、单卡片布局等 -->
      <component 
        :is="$route.meta.layout" 
        :title="title" 
        :is-x-small="screen.getScreenSizeInfo.isXSmall"
        :is-large="screen.getScreenSizeInfo.isLarge">
        
        <!-- 页面内容插槽，所有路由页面在此渲染 -->
        <div class="content">
          <!-- Vue Router视图容器，渲染当前路由对应的页面组件 -->
          <router-view></router-view>
        </div>
        
        <!-- 页脚插槽，为布局组件提供统一的页脚区域 -->
        <template #footer>
          <!-- 应用页脚组件，应用主题文本颜色 -->
          <app-footer class="dx-theme-text-color" />
        </template>
      </component>
    </div>
  </div>
</template>

<script lang="js" setup>
// 导入页脚组件
import AppFooter from "./components/app-footer.vue";

// 导入媒体查询工具，用于响应式设计
import { sizes, subscribe, unsubscribe } from "./utils/media-query";

// 导入Vue 3 Composition API功能
import {
  getCurrentInstance,    // 获取当前组件实例
  reactive,             // 创建响应式对象
  onMounted,            // 组件挂载生命周期钩子
  onBeforeUnmount,      // 组件卸载前生命周期钩子
  computed              // 计算属性
} from "vue";

// 导入应用信息配置
import appInfo from './app-info';

// 获取屏幕尺寸信息的函数
// 用于判断当前设备类型（手机、平板、桌面）并应用相应的CSS类
function getScreenSizeInfo() {
  // 获取当前屏幕尺寸状态
  const screenSizes = sizes();

  return {
    // 是否为超小屏幕（手机）
    isXSmall: screenSizes["screen-x-small"],
    // 是否为大屏幕（桌面）
    isLarge: screenSizes["screen-large"],
    // 当前激活的所有屏幕尺寸CSS类名数组
    cssClasses: Object.keys(screenSizes).filter(cl => screenSizes[cl])
  };
}

// 导入主题服务
import theme from './services/theme-service';

// 应用默认主题样式
theme.applyTheme()

// 应用标题，从配置文件获取
const title = appInfo.title;

// 响应式屏幕信息对象，用于跟踪屏幕尺寸变化
const screen = reactive({ getScreenSizeInfo: {} });

// 初始化屏幕信息
screen.getScreenSizeInfo = getScreenSizeInfo();

// 屏幕尺寸变化回调函数
// 当窗口大小发生变化时，更新屏幕信息状态
function screenSizeChanged() {
  screen.getScreenSizeInfo = getScreenSizeInfo();
}

// 组件挂载后的处理
onMounted(() => {
  // 订阅媒体查询变化事件，监听屏幕尺寸变化
  subscribe(screenSizeChanged);
});

// 组件卸载前的清理工作
onBeforeUnmount(() => {
  // 取消订阅媒体查询变化事件，避免内存泄漏
  unsubscribe(screenSizeChanged);
});

// 计算属性：生成应用的CSS类名数组
// 包含基础"app"类和当前屏幕尺寸相关的响应式类
const cssClasses = computed(() => {
  return ["app"].concat(screen.getScreenSizeInfo.cssClasses);
});

</script>

<!-- 全局样式定义 -->
<style lang="scss">
/* 重置HTML和BODY的默认样式，确保全屏显示 */
html,
body {
  margin: 0px;          // 清除默认外边距
  min-height: 100%;     // 最小高度为视口高度
  height: 100%;         // 高度为视口高度
}

/* 根容器样式，占满整个视口 */
#root {
  height: 100%;
}

/* 通用盒模型设置，包含边框和内边距在内的尺寸计算 */
* {
  box-sizing: border-box;
}

/* 应用主容器样式 */
.app {
  // 导入主题基础变量
  @import "./themes/generated/variables.base.scss";
  
  // 设置背景色为基础背景色的深色版本
  background-color: darken($base-bg, 5);
  
  // 使用Flexbox布局
  display: flex;
  
  // 占满整个视口
  height: 100%;
  width: 100%;
}
</style>
