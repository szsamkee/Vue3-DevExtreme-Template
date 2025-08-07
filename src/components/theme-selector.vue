<!-- 主题选择器组件
     提供用户界面主题切换功能，支持多种颜色主题和明暗模式
     集成国际化和自定义样式渲染 -->
<template>
    <!-- DevExtreme选择框组件，用于主题选择 -->
    <DxSelectBox 
      :items="themeSource"
      :value="currentTheme"
      valueExpr="value"
      displayExpr="text"
      width="145px"
      stylingMode="outlined"
      @value-changed="onValueChanged"
      field-template="field"
      item-template="item"
      :dropDownOptions="{wrapperAttr: {class: 'selectboxDropdown'} }"
      >
      <!-- 自定义字段模板：当前选中主题的显示样式 -->
      <template #field="{ data }">
        <div class="custom-item">
          <!-- 主题图标，显示主题的视觉标识 -->
          <img class="theme-icon" :src="data.ImageSrc " />
            <!-- 只读文本框，显示当前主题名称 -->
            <DxTextBox
                width="80px"
                :inputAttr="{class:'dx-theme-text-color theme-textbox' }"
                :value="data.text"
                :readOnly="true"
            />
        </div>
      </template>
      
      <!-- 自定义项目模板：下拉列表中每个主题选项的显示样式 -->
      <template #item="{ data }">
        <div class="custom-item">
          <!-- 主题图标，显示主题的视觉标识 -->
          <img class="theme-icon" :src="data.ImageSrc" />
          <!-- 主题名称文本 -->
          <div class="theme-text">
            {{ data.text }}
          </div>
        </div>
      </template>
    </DxSelectBox>
</template>

<!-- Vue 3 Script Setup语法 -->
<script setup>
// === 导入依赖 ===
// 主题服务，提供主题管理功能
import theme from '../services/theme-service';
// DevExtreme选择框组件
import DxSelectBox from 'devextreme-vue/select-box';
// DevExtreme文本框组件
import DxTextBox from 'devextreme-vue/text-box';
// Vue 3 Composition API
import { ref, computed } from 'vue';
// 国际化相关函数
import { initLocalLanguage, loadLocalMsg } from '../localization/localization';

// === 初始化 ===
// 初始化用户选择的语言设置
initLocalLanguage();

// === 响应式数据 ===
// 当前选中的主题值，与主题服务保持同步
const currentTheme = ref(theme.getTheme());

// === 计算属性 ===
// 本地化的主题数据源，动态生成包含翻译后主题名称的数组
const themeSource = computed(() => {
  // 获取原始主题数据
  const originalData = theme.getThemeData();
  // 映射每个主题项，替换为本地化的文本
  return originalData.map(item => ({
    ...item,                                    // 保留原有属性（value, ImageSrc等）
    text: getLocalizedThemeName(item.value)     // 使用本地化的主题名称
  }));
});

// === 辅助函数 ===
// 获取本地化主题名称，根据主题值返回对应的翻译文本
function getLocalizedThemeName(themeValue) {
  // 主题值到国际化键的映射表
  const keyMap = {
    'orange.light': 'theme-selector-orange-light',   // 橙色浅色主题
    'blue.light': 'theme-selector-blue-light',       // 蓝色浅色主题
    'purple.light': 'theme-selector-purple-light',   // 紫色浅色主题
    'purple.dark': 'theme-selector-purple-dark'      // 紫色深色主题
  };
  
  // 获取对应的国际化键
  const key = keyMap[themeValue];
  // 返回翻译后的文本，如果找不到键则返回原值
  return key ? loadLocalMsg(key) : themeValue;
}

// === 事件处理函数 ===
// 主题切换处理函数，响应用户选择变化
function onValueChanged(e) {
  // 应用新选择的主题到整个应用
  theme.applyTheme(e.value);
  // 更新本地状态，保持界面同步
  currentTheme.value = e.value;
}
</script>

<!-- 主题选择器样式定义 -->
<style>
/* 下拉列表项目样式 */
.selectboxDropdown .dx-list-item-content {
    font-size: 16px;                 /* 字体大小 */
    padding: 0px;                    /* 移除内边距 */
}

/* 自定义项目容器（用于字段和列表项） */
.custom-item {
    height:42px;                     /* 固定高度 */
    display: flex;                   /* 弹性布局 */
    flex-direction: row;             /* 水平排列 */
    align-items: center;             /* 垂直居中 */
}

/* 主题图标样式 */
.theme-icon {
    height:24px;                     /* 图标高度 */
    width:24px;                      /* 图标宽度 */
    margin-left:8px;                 /* 左外边距 */
    margin-right:8px;                /* 右外边距 */
}

/* 主题文本框样式（当前选中项显示） */
.dx-texteditor.dx-editor-outlined .dx-texteditor-input.theme-textbox {
    font-size: 14px;                 /* 字体大小 */
    padding: 0px;                    /* 移除内边距 */
}

/* 主题文本样式（下拉列表项显示） */
.theme-text {
    font-size: 14px;                 /* 字体大小 */
    height: 17px;                    /* 固定高度 */
}
</style>