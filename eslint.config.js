// ESLint代码质量检查配置文件
// 定义JavaScript和Vue代码的语法检查、代码风格和最佳实践规则
// 帮助团队维持统一的代码质量标准和开发规范

// 导入ESLint配置工具函数（如果使用新版ESLint配置格式）
// import { defineConfig } from 'eslint-define-config'

// === ESLint配置对象 ===
// 注意：当前文件为空，以下为推荐的Vue 3 + Vite项目ESLint配置示例
module.exports = {
  // === 基础环境配置 ===
  // 指定代码运行环境，影响全局变量的识别
  env: {
    browser: true,        // 浏览器环境，启用window、document等全局变量
    es2021: true,         // ES2021语法支持
    node: true,           // Node.js环境，启用require、process等全局变量
    'vue/setup-compiler-macros': true  // Vue 3 Script Setup编译器宏
  },

  // === 扩展配置 ===
  // 继承推荐的ESLint规则集
  extends: [
    'eslint:recommended',           // ESLint推荐规则
    '@vue/eslint-config-prettier',  // Vue + Prettier集成配置
    'plugin:vue/vue3-recommended'   // Vue 3推荐规则
  ],

  // === 解析器配置 ===
  // 指定代码解析器，支持Vue单文件组件
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',  // JavaScript解析器
    ecmaVersion: 2021,               // ECMAScript版本
    sourceType: 'module',            // 模块类型
    requireConfigFile: false,        // 不要求Babel配置文件
    allowImportExportEverywhere: true // 允许在任何地方使用import/export
  },

  // === 插件配置 ===
  // 启用ESLint插件，提供额外的检查规则
  plugins: [
    'vue',        // Vue.js插件
    'prettier'    // Prettier代码格式化插件
  ],

  // === 自定义规则 ===
  // 定义项目特定的代码规则
  rules: {
    // Vue相关规则
    'vue/multi-word-component-names': 'off',      // 允许单词组件名
    'vue/no-unused-vars': 'error',                // 禁止未使用的变量
    'vue/script-setup-uses-vars': 'error',       // Script Setup中变量使用检查
    
    // JavaScript通用规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',  // 生产环境警告console
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境警告debugger
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],            // 允许下划线开头的未使用参数
    
    // 代码风格规则
    'quotes': ['error', 'single'],                // 强制使用单引号
    'semi': ['error', 'always'],                  // 强制使用分号
    'indent': ['error', 2],                       // 强制2空格缩进
    'comma-dangle': ['error', 'never'],           // 禁止尾随逗号
    
    // Prettier集成
    'prettier/prettier': 'error'                  // Prettier格式化错误作为ESLint错误
  },

  // === 文件匹配配置 ===
  // 指定ESLint检查的文件类型
  overrides: [
    {
      files: ['*.vue'],                    // Vue单文件组件
      rules: {
        'vue/component-definition-name-casing': ['error', 'PascalCase']  // 组件名使用PascalCase
      }
    },
    {
      files: ['*.js', '*.jsx'],            // JavaScript文件
      rules: {
        // JavaScript特定规则
      }
    }
  ],

  // === 忽略配置 ===
  // 指定ESLint忽略检查的文件和目录
  ignorePatterns: [
    'dist/',              // 构建输出目录
    'node_modules/',      // 依赖包目录
    '*.min.js',           // 压缩后的JavaScript文件
    'public/',            // 公共静态资源目录
    'coverage/'           // 测试覆盖率报告目录
  ]
};

// === 使用说明 ===
// 1. 安装依赖：npm install --save-dev eslint @vue/eslint-config-prettier eslint-plugin-vue
// 2. 运行检查：npm run lint 或 npx eslint src/
// 3. 自动修复：npx eslint src/ --fix
// 4. IDE集成：安装ESLint插件以获得实时检查