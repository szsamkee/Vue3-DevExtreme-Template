<!-- 侧边导航外部工具栏布局组件
     提供包含顶部工具栏和侧边导航菜单的主布局方案
     支持响应式设计，在不同屏幕尺寸下自动调整菜单显示模式 -->
<template>
  <!-- 主布局容器，应用主题背景色 -->
  <div class="side-nav-outer-toolbar dx-theme-background-color">
    <!-- 头部工具栏组件 -->
    <HeaderToolbar
      class="layout-header"
      :menu-toggle-enabled="true"
      :toggle-menu-func="toggleMenu"
      :title="title"
    />
    
    <!-- DevExtreme抽屉组件，用于实现侧边菜单的滑入滑出效果 -->
    <dx-drawer
      class="layout-body"
      position="before"
      template="menuTemplate"
      v-model:opened="menuOpened"
      :opened-state-mode="drawerOptions.menuMode"
      :reveal-mode="drawerOptions.menuRevealMode"
      :min-size="drawerOptions.minMenuSize"
      :max-size="drawerOptions.maxMenuSize"
      :shading="drawerOptions.shaderEnabled"
      :close-on-outside-click="drawerOptions.closeOnOutsideClick"
    >
      <!-- 可滚动视图容器，包含页面主要内容 -->
      <dx-scroll-view ref="scrollViewRef" class="with-footer">
        <!-- 默认插槽，插入页面主要内容 -->
        <slot />
        <!-- 页脚插槽，插入页脚内容 -->
        <slot name="footer" />
      </dx-scroll-view>
      
      <!-- 菜单模板，定义侧边菜单内容 -->
      <template #menuTemplate>
        <!-- 侧边导航菜单组件 -->
        <side-nav-menu
          :compact-mode="!menuOpened"
          @click="handleSideBarClick"
        />
      </template>
    </dx-drawer>
  </div>
</template>

<!-- Vue 3 Script Setup语法 -->
<script setup>
// === 导入依赖 ===
// DevExtreme抽屉组件，用于实现侧边菜单
import DxDrawer from "devextreme-vue/drawer";
// DevExtreme滚动视图组件，用于内容区域滚动
import DxScrollView from "devextreme-vue/scroll-view";

// 头部工具栏组件
import HeaderToolbar from "../components/header-toolbar.vue";
// 侧边导航菜单组件
import SideNavMenu from "../components/side-nav-menu.vue";
// Vue 3 Composition API
import { computed, ref, watch} from 'vue';
// Vue Router路由钩子
import { useRoute } from 'vue-router';

// === Props定义 ===
// 定义从父组件接收的属性
const props = defineProps({
  title: String,      // 页面标题
  isXSmall: Boolean,  // 是否为超小屏幕
  isLarge: Boolean    // 是否为大屏幕
});

// === 路由和响应式数据 ===
// 获取当前路由信息
const route = useRoute();

// 滚动视图组件引用
const scrollViewRef = ref(null);
// 菜单打开状态，大屏幕默认打开
const menuOpened = ref(props.isLarge);
// 菜单临时打开状态标志
const menuTemporaryOpened = ref(false);

// === 事件处理函数 ===
// 切换菜单显示/隐藏状态
function toggleMenu(e) {
  // 获取原始指针事件
  const pointerEvent = e.event;
  // 阻止事件冒泡，防止触发其他点击处理
  pointerEvent.stopPropagation();
  
  // 如果菜单当前打开，取消临时打开状态
  if (menuOpened.value) {
    menuTemporaryOpened.value = false;
  }
  
  // 切换菜单打开状态
  menuOpened.value = !menuOpened.value;
}

// 处理侧边栏点击事件
function handleSideBarClick() {
  // 如果菜单当前关闭，设置临时打开状态
  if (menuOpened.value === false) {
    menuTemporaryOpened.value = true;
  }
  // 打开菜单
  menuOpened.value = true;
}

// === 计算属性 ===
// 抽屉配置选项，根据屏幕尺寸动态计算
const drawerOptions = computed(() => {
  // 在非大屏幕设备上启用遮罩层
  const shaderEnabled = !props.isLarge;

  return {
    // 菜单模式：大屏幕使用收缩模式，小屏幕使用覆盖模式
    menuMode: props.isLarge ? "shrink" : "overlap",
    // 显示模式：超小屏幕使用滑动，其他使用展开
    menuRevealMode: props.isXSmall ? "slide" : "expand",
    // 最小尺寸：超小屏幕为0，其他为60px
    minMenuSize: props.isXSmall ? 0 : 60,
    // 最大尺寸：超小屏幕限制为250px，其他无限制
    maxMenuSize: props.isXSmall ? 250 : undefined,
    // 点击外部关闭：启用遮罩层时允许
    closeOnOutsideClick: shaderEnabled,
    // 遮罩层启用状态
    shaderEnabled
  };
});

// === 监听器 ===
// 监听屏幕尺寸变化，自动调整菜单状态
watch(
  () => props.isLarge,
  () => {
    // 如果不是临时打开状态，根据屏幕尺寸调整菜单状态
    if (!menuTemporaryOpened.value) {
      menuOpened.value = props.isLarge;
    }
});

// 监听路由变化，在小屏幕设备上自动关闭菜单并滚动到顶部
watch(
  () => route.path,
  () => {
    // 如果是临时打开或非大屏幕设备，关闭菜单
    if (menuTemporaryOpened.value || !props.isLarge) {
      menuOpened.value = false;
      menuTemporaryOpened.value = false;
    }
    
    // 滚动到页面顶部，提供更好的导航体验
    scrollViewRef.value.instance.scrollTo(0);
  }
);
</script>

<!-- 侧边导航外部工具栏布局样式 -->
<style lang="scss">
/* 主布局容器样式 */
.side-nav-outer-toolbar {
  flex-direction: column;        // 垂直方向布局
  display: flex;                 // 弹性布局
  height: 100%;                  // 占满父容器高度
  width: 100%;                   // 占满父容器宽度
}

/* 布局头部样式 */
.layout-header {
  z-index: 1501;                 // 高层级，确保头部在最上层显示
}
</style>
