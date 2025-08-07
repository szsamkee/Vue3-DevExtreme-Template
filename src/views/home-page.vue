<!-- 首页组件
     应用的主要着陆页面，为已登录用户提供欢迎界面和主要内容展示
     支持多语言显示和响应式设计 -->
<template>
    <div>
        <!-- 页面标题，使用本地化文本 -->
        <h2 class="content-block">{{ pageTitle }}</h2>
        
        <!-- 主要内容区域 -->
        <div class="content-block">
            <!-- 内容卡片容器，使用DevExtreme卡片样式和响应式内边距 -->
            <div class="dx-card responsive-paddings">
                <!-- Logo和内容展示容器 -->
                <div class="logos-container">
                    <!-- 首页内容文本，支持多语言 -->
                    {{ contentText }}
                </div>
            </div>
        </div>
    </div>
</template>

<!-- Vue 3 Script Setup语法 -->
<script setup>
// 导入Vue 3 响应式API
import { ref } from 'vue';
// 导入国际化相关函数
import { initLocalLanguage, loadLocalMsg } from '../localization/localization';

// === 初始化本地化 ===
// 初始化用户选择的语言设置，加载相应的语言包
initLocalLanguage();

// === 本地化文本定义 ===
// 创建响应式的页面标题文本，支持语言切换
const pageTitle = ref(loadLocalMsg('home-page-title'));      // "首页"

// 创建响应式的内容文本，支持语言切换
const contentText = ref(loadLocalMsg('home-page-content'));  // "首页文本及组件区域"
</script>

<!-- 组件样式定义 -->
<style lang="scss">
/* Logo和内容容器样式 */
.logos-container {
    margin: 20px 0 40px 0;  // 设置上下外边距
    text-align: center;     // 内容居中对齐

    /* SVG图标通用样式 */
    svg {
        display: inline-block;  // 行内块显示，便于水平排列
    }
}

/* DevExtreme Logo样式 */
.devextreme-logo {
    width: 200px;          // 固定宽度
    height: 34px;          // 固定高度
    margin-bottom: 17px;   // 底部外边距
}

/* Vue Logo样式 */
.vue-logo {
    width: 180px;          // 固定宽度
    height: 62px;          // 固定高度
}

/* 加号连接符样式 */
.plus {
    margin: 20px 10px;     // 左右外边距，用于分隔Logo
    width: 22px;           // 固定宽度
    height: 22px;          // 固定高度
}

/* 超小屏幕（手机）适配样式 */
.screen-x-small .logos-container {
    svg {
        width: 100%;       // 在小屏幕上占满宽度
        display: block;    // 块级显示，垂直排列

        /* 小屏幕上的加号样式调整 */
        &.plus {
            margin: 0;     // 移除外边距，紧凑显示
        }
    }
}
</style>
