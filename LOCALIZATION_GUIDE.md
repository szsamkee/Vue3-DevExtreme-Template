# 国际化文件说明文档 (Localization Guide)

## 📋 概述

本项目采用多语言国际化架构，支持中文、日文、越南文三种语言的动态切换。国际化系统基于JSON文件存储翻译文本，通过Vue组件实现语言切换功能。

## 📁 文件结构

```
src/localization/
├── localization.js          # 国际化服务主文件（已添加详细注释）
├── localization.zh.json     # 中文翻译文件
├── localization.ja.json     # 日文翻译文件
├── localization.vi.json     # 越南文翻译文件
└── LOCALIZATION_GUIDE.md    # 本说明文档
```

## 🌍 支持的语言

| 语言代码 | 语言名称 | 文件名 | 完成状态 |
|---------|---------|--------|----------|
| `zh` | 简体中文 | localization.zh.json | ✅ 完整 |
| `ja` | 日本語 | localization.ja.json | ✅ 完整 |
| `vi` | Tiếng Việt | localization.vi.json | ✅ 完整 |

## 🔑 翻译键值说明

### 登录表单相关 (login-form-*)

| 键名 | 中文 | 用途说明 |
|------|------|----------|
| `login-form-languagecode` | 选择语言 | 语言选择下拉框标签 |
| `login-form-orgcode` | 组织代码 | 组织代码输入框标签 |
| `login-form-usercode` | 用户代码 | 用户名输入框标签 |
| `login-form-password` | 登录密码 | 密码输入框标签 |
| `login-form-basedate` | 基准日期 | 基准日期选择器标签 |
| `login-form-login-title` | 登录系统 | 登录页面标题 |
| `login-form-login-button` | 登录 | 登录按钮文本 |
| `login-form-*-required` | 必填项提示 | 表单验证错误信息 |

### 首页相关 (home-page-*)

| 键名 | 中文 | 用途说明 |
|------|------|----------|
| `home-page-title` | 首页 | 首页标题 |
| `home-page-content` | 首页文本及组件区域 | 首页内容描述 |

### 页脚相关 (app-footer-*)

| 键名 | 中文 | 用途说明 |
|------|------|----------|
| `app-footer-copyright` | 版权所有 | 版权声明文本 |
| `app-footer-all-rights` | 保留所有权利 | 权利保留声明 |
| `app-footer-trademarks` | 商标声明 | 商标权利说明 |

### 侧边菜单相关 (side-nav-menu-*)

| 键名 | 中文 | 用途说明 |
|------|------|----------|
| `side-nav-menu-loading` | 加载菜单中... | 菜单加载状态提示 |
| `side-nav-menu-load-failed` | 菜单加载失败 | 菜单加载失败提示 |
| `side-nav-menu-using-default` | 使用默认菜单 | 降级处理提示 |

### 主题选择器相关 (theme-selector-*)

| 键名 | 中文 | 用途说明 |
|------|------|----------|
| `theme-selector-orange-light` | 橙色浅色 | 橙色浅色主题名称 |
| `theme-selector-blue-light` | 蓝色浅色 | 蓝色浅色主题名称 |
| `theme-selector-purple-light` | 紫色浅色 | 紫色浅色主题名称 |
| `theme-selector-purple-dark` | 紫色深色 | 紫色深色主题名称 |

## 🛠️ 使用方式

### 1. 在Vue组件中使用

```javascript
// 导入国际化函数
import { loadLocalMsg } from '../localization/localization';

// 在组件中使用
const welcomeText = loadLocalMsg('home-page-title');  // 返回: "首页"
```

### 2. 在模板中使用

```vue
<template>
  <div>{{ loadLocalMsg('login-form-login-title') }}</div>
</template>
```

### 3. 响应式使用

```javascript
import { ref } from 'vue';
import { loadLocalMsg } from '../localization/localization';

// 创建响应式翻译文本
const title = ref(loadLocalMsg('home-page-title'));
```

## 📝 添加新翻译的步骤

### 1. 定义翻译键名
选择有意义的键名，遵循 `模块-组件-用途` 的命名规范：
```
login-form-username        // 登录表单-用户名
user-profile-edit-button   // 用户资料-编辑按钮
```

### 2. 在所有语言文件中添加翻译
确保在每个JSON文件中都添加相同的键：

**localization.zh.json**
```json
{
  "user-profile-edit-button": "编辑资料"
}
```

**localization.ja.json**
```json
{
  "user-profile-edit-button": "プロフィール編集"
}
```

**localization.vi.json**
```json
{
  "user-profile-edit-button": "Chỉnh sửa hồ sơ"
}
```

### 3. 在代码中使用
```javascript
const editButtonText = loadLocalMsg('user-profile-edit-button');
```

## 🔧 维护指南

### 1. 翻译质量检查
- 确保所有语言文件包含相同的键
- 验证翻译的准确性和文化适应性
- 保持翻译文本长度合理，避免UI布局问题

### 2. 键名管理
- 使用有意义的键名，便于维护
- 避免键名重复或冲突
- 删除未使用的翻译键

### 3. 文件格式
- 保持JSON文件格式正确
- 使用UTF-8编码
- 保持键的字母顺序（便于查找）

## 🌟 最佳实践

1. **一致性**：所有语言文件应包含相同的键
2. **可读性**：使用清晰的键名和组织结构
3. **性能**：避免过大的翻译文件，考虑按模块分割
4. **测试**：在不同语言下测试UI布局和功能
5. **文档**：及时更新本文档，记录新增的翻译键

## 📊 翻译完成度统计

- **总翻译键数量**: 22个
- **中文翻译**: 100% 完成
- **日文翻译**: 100% 完成  
- **越南文翻译**: 100% 完成

## 🚀 扩展建议

1. **添加更多语言**: 可考虑添加英语、韩语等
2. **动态加载**: 实现翻译文件的按需加载
3. **翻译管理工具**: 使用专业的国际化管理平台
4. **复数形式**: 支持根据数量的复数形式翻译
5. **格式化支持**: 支持参数插值和日期格式化
