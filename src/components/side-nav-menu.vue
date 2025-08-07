<!-- 侧边导航菜单组件
     动态从API加载菜单结构，支持树形菜单显示和路由导航
     具备加载状态、错误处理和响应式设计功能 -->
<template>
  <!-- 侧边菜单容器，应用额外主题样式 -->
  <div
    class="dx-swatch-additional side-navigation-menu"
    @click="forwardClick"
  >
    <!-- 插槽，允许父组件插入自定义内容 -->
    <slot />
    
    <!-- 菜单内容容器 -->
    <div class="menu-container">
      <!-- 加载状态显示 -->
      <div v-if="loading" class="menu-loading">
        <!-- DevExtreme加载指示器 -->
        <dx-load-indicator :visible="true" />
        <!-- 加载文本提示 -->
        <span>{{ loadingText }}</span>
      </div>
      
      <!-- 树形菜单视图，在加载完成后显示 -->
      <DxTreeView
        v-else
        ref="treeViewRef"
        :items="items"
        key-expr="path"
        selection-mode="single"
        :focus-state-enabled="false"
        expand-event="click"
        @item-click="handleItemClick"
        width="100%"
      />
    </div>
  </div>
</template>

<!-- Vue 3 Script Setup语法 -->
<script setup>
// === 导入依赖 ===
// 媒体查询工具，用于响应式设计判断
import { sizes } from '../utils/media-query';
// Vue 3 Composition API
import { onMounted, ref, watch, reactive } from 'vue';
// Vue Router钩子
import { useRoute, useRouter } from 'vue-router'; 
// DevExtreme树形视图组件
import { DxTreeView } from 'devextreme-vue';
// DevExtreme加载指示器组件
import DxLoadIndicator from "devextreme-vue/load-indicator";
// API服务，用于获取菜单数据
import apiService from '../services/api-service.js';
// 通知组件，用于显示错误信息
import notify from 'devextreme/ui/notify';
// 国际化相关函数
import { initLocalLanguage, loadLocalMsg } from '../localization/localization';

// === 初始化本地化 ===
// 初始化用户选择的语言设置
initLocalLanguage();

// === 本地化文本定义 ===
// 加载中提示文本
const loadingText = ref(loadLocalMsg('side-nav-menu-loading'));           // "加载菜单中..."
// 加载失败提示文本
const loadFailedText = ref(loadLocalMsg('side-nav-menu-load-failed'));     // "菜单加载失败"
// 使用默认菜单提示文本
const usingDefaultText = ref(loadLocalMsg('side-nav-menu-using-default')); // "无法从服务器加载菜单，请刷新页面重试"

// === Props定义 ===
// 接收父组件传递的属性
const props = defineProps({
  compactMode: Boolean  // 紧凑模式标志，控制菜单的展开/收起状态
});

// === Emits定义 ===
// 定义组件可以触发的事件
const emit = defineEmits(['click']);

// === 路由和响应式数据 ===
// 获取当前路由信息
const route = useRoute();
// 获取路由器实例，用于编程式导航
const router = useRouter();

// 判断是否为大屏幕设备
const isLargeScreen = sizes()['screen-large'];

// 响应式菜单项数组，从API动态加载
const items = reactive([]);
// 加载状态标志
const loading = ref(true);

// === 菜单数据加载函数 ===
// 从API异步加载菜单项数据
async function loadMenuItems() {
  try {
    // 开始加载，显示加载状态
    loading.value = true;
    
    // 调用API获取菜单数据
    const menuData = await apiService.auth.getMenuItems();
    
    // 处理菜单数据格式，确保路径格式正确
    const processedItems = menuData.map((item) => {
      // 确保路径以"/"开头（规范化路径格式）
      if(item.path && !(/^\//.test(item.path))){ 
        item.path = `/${item.path}`;
      }
      // 返回处理后的菜单项，大屏幕设备默认展开
      return {...item, expanded: isLargeScreen};
    });
    
    // 清空现有菜单项并填充新数据，保持响应性
    items.splice(0, items.length, ...processedItems);
    
  } catch (error) {
    // 加载失败时的错误处理
    console.error(`${loadFailedText.value}:`, error);
    
    // 清空菜单项，显示空菜单
    items.splice(0, items.length);
    
    // 显示警告提示，告知用户加载失败
    notify(usingDefaultText.value, 'warning', 3000);
  } finally {
    // 无论成功或失败，都要停止加载状态
    loading.value = false;
  }
}

// === 组件引用 ===
// 树形视图组件的引用，用于调用组件方法
const treeViewRef = ref(null);

// === 事件处理函数 ===
// 转发点击事件到父组件
function forwardClick (...args) {
  emit("click", args);
}

// 处理菜单项点击事件
function handleItemClick(e) {
  // 如果没有路径或处于紧凑模式，则不执行导航
  if (!e.itemData.path || props.compactMode) {
    return;
  }
  
  // 执行路由跳转到对应路径
  router.push(e.itemData.path);

  // 停止事件冒泡，防止触发其他点击处理
  const pointerEvent = e.event;
  pointerEvent.stopPropagation();
}

// 更新菜单选中状态，同步当前路由
function updateSelection () {
  // 检查树形视图组件是否已初始化
  if (!treeViewRef.value || !treeViewRef.value.instance) {
    return;
  }

  // 选中当前路由对应的菜单项
  treeViewRef.value.instance.selectItem(route.path);
  // 展开当前路由对应的菜单项
  treeViewRef.value.instance.expandItem(route.path);
}

// === 生命周期钩子 ===
// 组件挂载后执行
onMounted(() => { 
  // 首先加载菜单项，然后更新选中状态
  loadMenuItems().then(() => {
    // 菜单加载完成后，同步选中状态
    updateSelection();
    
    // 如果是紧凑模式，收起所有菜单项
    if (props.compactMode) {
      treeViewRef.value?.instance?.collapseAll();
    }
  });
});

// === 监听器 ===
// 监听路由变化，自动更新菜单选中状态
watch(
  () => route.path,
  () => {
    updateSelection();
  }
);

// 监听紧凑模式变化，调整菜单展开状态
watch(
  () => props.compactMode,
  () => {
    if (props.compactMode) {
      // 紧凑模式：收起所有菜单项
      treeViewRef.value.instance.collapseAll();
    } else {
      // 正常模式：恢复选中状态和展开状态
      updateSelection();
    }
  }
);
</script>

<!-- 侧边菜单样式定义 -->
<style lang="scss">
// 导入DevExtreme样式和主题变量
@import "../dx-styles.scss";
@import "../themes/generated/variables.additional.scss";

/* 侧边导航菜单主容器 */
.side-navigation-menu {
  display: flex;              // 弹性布局
  flex-direction: column;     // 垂直方向排列
  min-height: 100%;          // 最小高度占满父容器
  height: 100%;              // 高度占满父容器
  width: 250px !important;   // 固定宽度（重要性标记，覆盖其他样式）

  /* 菜单内容容器 */
  .menu-container {
    min-height: 100%;        // 最小高度占满
    display: flex;           // 弹性布局
    flex: 1;                // 占据剩余空间

    /* 菜单加载状态样式 */
    .menu-loading {
      display: flex;               // 弹性布局
      flex-direction: column;      // 垂直排列
      align-items: center;         // 水平居中
      justify-content: center;     // 垂直居中
      padding: 20px;               // 内边距
      color: $base-text-color;     // 使用主题文本颜色
      
      /* 加载指示器样式 */
      .dx-loadindicator {
        margin-bottom: 10px;       // 底部外边距
      }
      
      /* 加载文本样式 */
      span {
        font-size: 14px;           // 字体大小
        opacity: 0.7;              // 透明度，显得更柔和
      }
    }

    /* DevExtreme树形视图样式定制 */
    .dx-treeview {
      // 长文本处理：不换行
      white-space: nowrap;

      // 图标宽度定制
      .dx-treeview-item {
        padding-left: 0;           // 移除左内边距
        padding-right: 0;          // 移除右内边距

        .dx-icon {
          width: $side-panel-min-width !important;  // 图标宽度
          margin: 0 !important;                     // 移除外边距
          color: $icon-color                        // 图标颜色
        }
      }

      // 节点箭头定制
      .dx-treeview-node {
        padding: 0 0 !important;   // 移除内边距
      }

      .dx-treeview-toggle-item-visibility {
        right: 10px;               // 箭头位置（右侧）
        left: auto;
      }

      .dx-rtl .dx-treeview-toggle-item-visibility {
        left: 10px;                // RTL模式下的箭头位置（左侧）
        right: auto;
      }

      // 菜单项层级样式定制
      .dx-treeview-node {
        // 一级菜单项样式
        &[aria-level="1"] {
          font-weight: bold;                    // 粗体字
          border-bottom: 1px solid $base-border-color;  // 底部分隔线
        }

        // 二级菜单项样式
        &[aria-level="2"] .dx-treeview-item-content {
          font-weight: normal;                  // 正常字重
          padding: 0 $side-panel-min-width;    // 左右内边距，形成缩进效果
        }
      }
    }

    // 选中和聚焦状态样式定制
    .dx-treeview {
      .dx-treeview-node-container {
        .dx-treeview-node {
          // 选中但未聚焦的项目样式
          &.dx-state-selected:not(.dx-state-focused) > .dx-treeview-item {
            background: transparent;            // 透明背景
          }

          // 选中项目的文本颜色
          &.dx-state-selected > .dx-treeview-item * {
            color: $base-accent;                // 使用主题强调色
          }

          // 悬停状态样式（非聚焦）
          &:not(.dx-state-focused) > .dx-treeview-item.dx-state-hover {
            background-color: $base-bg;         // 悬停背景色
          }
        }
      }
    }

    // Generic主题下的特殊样式处理
    .dx-theme-generic .dx-treeview {
      .dx-treeview-node-container
        .dx-treeview-node.dx-state-selected.dx-state-focused
        > .dx-treeview-item
        * {
        color: inherit;                         // 继承颜色，保持一致性
      }
    }
  }
}
</style>
