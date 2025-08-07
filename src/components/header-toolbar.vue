<!-- 头部工具栏组件
     提供页面顶部导航栏功能，包含菜单切换按钮、页面标题和主题选择器
     支持响应式布局和自定义操作按钮 -->
<template>
  <!-- 页面头部容器 -->
  <header class="header-component">
    <!-- DevExtreme工具栏组件，用于排列头部元素 -->
    <DxToolbar class="header-toolbar">
      <!-- 菜单切换按钮项目，条件显示 -->
      <DxItem
        :visible="menuToggleEnabled"
        location="before"
        css-class="menu-button"
      >
        <!-- 默认插槽，包含菜单切换按钮 -->
        <template #default>
          <!-- DevExtreme按钮，用于切换侧边菜单显示/隐藏 -->
          <dx-button
            icon="menu"
            styling-mode="text"
            @click="toggleMenuFunc"
          />
        </template>
      </DxItem>

      <!-- 页面标题项目，条件显示 -->
      <DxItem
        v-if="title"
        location="before"
        css-class="header-title dx-toolbar-label"
      >
        <!-- 显示动态页面标题 -->
        <div>{{ title }}</div>
    </DxItem>

      <!-- 右侧工具栏项目，包含主题选择器 -->
      <dx-item
        location="after">
        <!-- 主题选择器组件，允许用户切换应用主题 -->
        <ThemeSelector></ThemeSelector>
      </dx-item>
    </DxToolbar>
  </header>
</template>

<!-- Vue 3 Script Setup语法 -->
<script setup>
// === 导入依赖 ===
// DevExtreme按钮组件
import DxButton from "devextreme-vue/button";
// DevExtreme工具栏组件及其子组件
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
// 认证服务（虽然导入但当前未使用）
import auth from "../auth";

// 主题选择器组件
import ThemeSelector from "./theme-selector.vue";

// === Props定义 ===
// 定义从父组件接收的属性
defineProps({
  menuToggleEnabled: Boolean,  // 是否启用菜单切换按钮
  title: String,               // 页面标题文本
  toggleMenuFunc: Function,    // 菜单切换处理函数，由父组件提供
});
</script>

<!-- 头部工具栏样式定义 -->
<style lang="scss">
// 导入主题变量和基础样式
@import "../themes/generated/variables.base.scss";
@import "../dx-styles.scss";

/* 头部组件主容器 */
.header-component {
  flex: 0 0 auto;                                                  // 不伸缩，固定高度
  z-index: 1;                                                      // 层级，确保在其他内容之上
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); // 阴影效果

  /* 工具栏中菜单按钮的图标颜色 */
  .dx-toolbar .dx-toolbar-item.menu-button > .dx-toolbar-item-content .dx-icon {
    color: $base-accent;                                          // 使用主题强调色
  }
}

/* 头部工具栏右侧容器样式 */
.dx-toolbar.header-toolbar .dx-toolbar-items-container .dx-toolbar-after {
  padding: 0 40px;                                               // 默认左右内边距

  /* 小屏幕设备响应式处理 */
  .screen-x-small & {
    padding: 0 20px;                                             // 小屏幕时减少内边距
  }
}

/* 菜单切换按钮样式 */
.dx-toolbar .dx-toolbar-item.dx-toolbar-button.menu-button {
  width: $side-panel-min-width;                                  // 固定宽度，与侧边栏最小宽度保持一致
  text-align: center;                                            // 居中对齐
  padding: 0;                                                    // 移除内边距
}

/* 头部标题样式 */
.header-title .dx-item-content {
  padding: 0;                                                    // 移除内边距
  margin: 0;                                                     // 移除外边距
}

/* Generic主题下的特殊样式处理 */
.dx-theme-generic {
  /* 工具栏额外的垂直内边距 */
  .dx-toolbar {
    padding: 10px 0;                                             // 上下内边距
  }

  /* 用户按钮内容的内边距调整 */
  .user-button > .dx-button-content {
    padding: 3px;                                                // 紧凑的内边距
  }
}
</style>
