<!-- 单卡片布局组件
     提供带有背景图片的卡片式布局，主要用于登录页面等独立页面
     支持响应式设计，在小屏幕设备上自动调整为全屏显示 -->
<template>
  <!-- 背景容器，设置背景图片 -->
  <div class="bg-div">
    <!-- DevExtreme滚动视图，确保内容可滚动 -->
    <dx-scroll-view height="100%" width="100%" class="with-footer single-card">
      <!-- DevExtreme卡片容器，包含主要内容 -->
      <div class="dx-card content">
        <!-- 卡片头部，显示标题和描述 -->
        <div class="header">
          <!-- 页面标题，从路由元信息动态获取 -->
          <div class="title">{{ title }}</div>
          <!-- 页面描述，从路由元信息动态获取 -->
          <div class="description">{{ description }}</div>
        </div>
        <!-- 默认插槽，插入页面主要内容（如登录表单） -->
        <slot />
      </div>
    </dx-scroll-view>
  </div>
</template>

<!-- Vue 3 Script Setup语法 -->
<script setup>
// === 导入依赖 ===
// DevExtreme滚动视图组件
import DxScrollView from "devextreme-vue/scroll-view";

// Vue Router路由钩子
import { useRoute } from 'vue-router';
// Vue 3 Composition API
import { watch, ref } from 'vue';

// === 路由和响应式数据 ===
// 获取当前路由信息
const route = useRoute();

// 页面标题，从路由元信息初始化
const title = ref(route.meta.title);
// 页面描述，从路由元信息初始化
const description = ref(route.meta.description);

// === 监听器 ===
// 监听路由变化，自动更新页面标题和描述
watch(() => route.path,
  () => {
    // 更新标题为当前路由的元信息标题
    title.value = route.meta.title;
    // 更新描述为当前路由的元信息描述
    description.value = route.meta.description;
  }
);
</script>

<!-- 单卡片布局样式定义 -->
<style lang="scss">
// 导入主题变量
@import "../themes/generated/variables.base.scss";

/* 背景容器样式 */
.bg-div {
  width: 100%;                              // 占满父容器宽度
  background-image: url("/bg.jpg");         // 设置背景图片
  background-size: cover;                   // 背景图片覆盖整个容器
  background-position: center;              // 背景图片居中定位
  background-repeat: no-repeat;             // 背景图片不重复
  
  /* 单卡片滚动视图样式 */
  .single-card {
    width: 100%;                            // 占满父容器宽度
    height: 100%;                           // 占满父容器高度

    /* DevExtreme卡片样式 */
    .dx-card {
      width: 330px;                         // 卡片固定宽度
      margin: auto auto;                    // 水平居中
      padding: 40px;                        // 内边距
      flex-grow: 0;                         // 不允许弹性增长
      
      /* 定位设置：让登录框靠右显示 */
      position: fixed;                      // 固定定位
      top: 50%;                             // 垂直居中
      transform: translateY(-50%);          // 垂直居中偏移补正
      right: 5%;                            // 距离右边缘5%

      /* 超小屏幕响应式处理 */
      .screen-x-small & {
        width: 100%;                        // 全宽度
        height: 100%;                       // 全高度
        border-radius: 0;                   // 移除圆角
        box-shadow: none;                   // 移除阴影
        margin: 0;                          // 移除外边距
        border: 0;                          // 移除边框
        flex-grow: 1;                       // 允许弹性增长
      }

      /* 卡片头部样式 */
      .header {
        margin-bottom: 30px;                // 底部外边距

        /* 标题样式 */
        .title {
          color: $base-text-color;          // 使用主题文本颜色
          line-height: 28px;                // 行高
          font-weight: 500;                 // 字体粗细
          font-size: 24px;                  // 字体大小
        }

        /* 描述文本样式 */
        .description {
          color: rgba($base-text-color, alpha($base-text-color) * 0.7); // 带透明度的文本颜色
          line-height: 18px;                // 行高
        }
      }
    }
  }
}
</style>
