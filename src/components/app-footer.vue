<!-- 应用页脚组件
     显示版权信息、商标声明等法律文本
     支持多语言显示和动态年份更新 -->
<template>
  <!-- 页脚内容容器 -->
  <div class="content-block">
    <!-- 页脚主体，包含版权和商标信息 -->
    <footer class="footer">
      <!-- 版权信息行：版权文本 + 年份范围 + 应用标题 -->
      {{ copyrightText }} © 2011-{{ currentYear }} {{ appTitle }} Inc.
      <br />
      <!-- 商标声明文本 -->
      {{ trademarksText }}
    </footer>
  </div>
</template>

<!-- Vue 3 Script Setup语法 -->
<script setup>
// 导入Vue 3 响应式API
import { ref, computed } from 'vue';
// 导入国际化相关函数
import { initLocalLanguage, loadLocalMsg } from '../localization/localization';
// 导入应用信息配置
import appInfo from '../app-info';

// === 初始化本地化 ===
// 初始化用户选择的语言设置，加载相应的语言包
initLocalLanguage();

// === 本地化文本定义 ===
// 版权文本，支持多语言："版权所有" / "Copyright" 等
const copyrightText = ref(loadLocalMsg('app-footer-copyright'));

// 商标声明文本，支持多语言
const trademarksText = ref(loadLocalMsg('app-footer-trademarks'));

// === 应用信息和动态数据 ===
// 从配置文件获取应用标题
const appTitle = appInfo.title;

// 计算属性：动态获取当前年份，确保版权年份始终是最新的
const currentYear = computed(() => new Date().getFullYear());
</script>

<!-- 页脚样式定义 -->
<style lang="scss">
// 导入主题基础变量
@import "../themes/generated/variables.base.scss";

/* 页脚主体样式 */
.footer {
  display: block;           // 块级显示

  // 顶部边框，使用半透明黑色分隔线
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  
  // 内边距设置，确保文本与边界有适当距离
  padding-top: 20px;        // 顶部内边距
  padding-bottom: 24px;     // 底部内边距
}
</style>
