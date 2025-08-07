# 项目结构和文件说明

## 根目录配置文件

### package.json - NPM项目配置文件
```json
{
  "name": "package",           // 项目名称
  "private": true,             // 私有项目，不发布到npm
  "version": "0.0.0",          // 项目版本号
  "type": "module",            // 使用ES模块类型
  "scripts": {
    "dev": "vite",             // 开发环境启动命令
    "build": "vite build",     // 生产环境构建命令
    "preview": "vite preview"  // 预览构建结果命令
  },
  "dependencies": {
    "axios": "^1.11.0",        // HTTP客户端库，用于API调用
    "devextreme": "23.1.5",    // DevExtreme UI组件库核心包
    "devextreme-vue": "23.1.5", // DevExtreme Vue集成包
    "sass": "1.70.0",          // Sass CSS预处理器
    "vue": "^3.5.17",          // Vue 3框架核心
    "vue-router": "^4.5.1"     // Vue路由管理器
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.0", // Vite Vue插件，支持Vue单文件组件
    "vite": "^7.0.4"           // Vite构建工具
  }
}
```

### vite.config.js - Vite构建工具配置文件
- 配置Vue插件支持
- 设置构建选项和开发服务器

### vue.config.js - Vue CLI配置文件
- Vue应用的构建和开发配置

### eslint.config.js - ESLint代码规范配置
- JavaScript/Vue代码质量检查规则

### index.html - 应用入口HTML文件
- 单页应用的主HTML模板
- 包含应用挂载点

## VS Code 配置

### .vscode/extensions.json - 推荐扩展配置
- Vue.volar: Vue 3语言服务器，提供语法高亮和智能提示

## 源代码结构 (src目录)

### 应用入口和配置
- **main.js**: Vue应用入口文件，创建应用实例
- **App.vue**: 根组件，定义应用的顶层结构
- **router.js**: Vue Router路由配置文件
- **auth.js**: 身份验证服务，处理登录、登出等
- **app-info.js**: 应用信息配置

### 页面组件 (views目录)
- **login-form.vue**: 登录页面组件
- **home-page.vue**: 首页组件  
- **tasks-page.vue**: 任务列表页面（测试页面）

### 可复用组件 (components目录)
- **app-footer.vue**: 应用页脚组件
- **header-toolbar.vue**: 顶部工具栏组件
- **side-nav-menu.vue**: 侧边导航菜单组件
- **theme-selector.vue**: 主题选择器组件

### 布局组件 (layouts目录)
- **side-nav-outer-toolbar.vue**: 侧边导航+外部工具栏布局
- **single-card.vue**: 单卡片布局（用于登录页）

### 服务层 (services目录)
- **http-service.js**: HTTP请求服务，处理API调用和错误
- **api-service.js**: API服务抽象层，定义业务接口
- **theme-service.js**: 主题管理服务

### 国际化 (localization目录)
- **localization.js**: 本地化核心逻辑
- **localization.zh.json**: 中文语言包
- **localization.vi.json**: 越南语言包
- **localization.ja.json**: 日语语言包

### 主题样式 (themes目录)
- **metadata.base.json**: 基础主题元数据
- **metadata.additional.json**: 附加主题元数据
- **generated/**: 自动生成的主题文件
  - **theme.base.css**: 基础主题样式
  - **theme.additional.css**: 附加主题样式
  - **variables.base.scss**: 基础SCSS变量
  - **variables.additional.scss**: 附加SCSS变量
  - **variables.css**: CSS变量文件

### 工具函数 (utils目录)
- **media-query.js**: 媒体查询工具函数
- **localization-extractor.js**: 本地化文本提取工具

### 样式文件
- **dx-styles.scss**: DevExtreme样式定制

## 静态资源 (public目录)

### 主题样式文件
- **dx.material.blue.light.css**: DevExtreme蓝色浅色主题
- **dx.material.orange.light.css**: DevExtreme橙色浅色主题  
- **dx.material.purple.light.css**: DevExtreme紫色浅色主题
- **dx.material.purple.dark.css**: DevExtreme紫色深色主题
- **theme.additional.light.css**: 附加浅色主题
- **theme.additional.dark.css**: 附加深色主题

### 图标和图片
- **favicon.ico**: 网站图标
- **bg.jpg**: 背景图片
- **fonts/**: 字体文件目录（Roboto字体系列）
- **icons/**: SVG图标文件

## 项目特性

1. **Vue 3 + Composition API**: 使用最新的Vue 3语法糖格式
2. **DevExtreme集成**: 企业级UI组件库
3. **多语言支持**: 中文、越南语、日语
4. **主题系统**: 多套可切换的UI主题
5. **JWT认证**: 基于Token的身份验证
6. **模块化架构**: 清晰的服务层和组件层分离
7. **响应式设计**: 支持多设备适配
