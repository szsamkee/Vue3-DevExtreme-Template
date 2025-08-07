// Vite构建工具配置文件
// 配置Vue 3项目的构建、开发服务器和模块解析规则
// Vite是下一代前端构建工具，提供快速的开发体验和优化的生产构建

// 导入Vite配置定义函数
import { defineConfig } from 'vite'
// 导入Vue 3官方Vite插件
import vue from '@vitejs/plugin-vue'
// 导入Node.js路径处理模块
import path from 'path'

// 官方Vite配置文档: https://vite.dev/config/
export default defineConfig({
  // === 插件配置 ===
  // 注册Vite插件列表
  plugins: [vue()], // Vue 3单文件组件(.vue)支持插件
  
  // === 模块解析配置 ===
  resolve: {
    // 路径别名配置，用于模块导入时的路径映射
    alias: {
      // Inferno库路径别名配置
      // 解决某些DevExtreme组件对Inferno的依赖问题
      // 将inferno模块映射到开发版本，提供更好的调试体验
      inferno: path.resolve(__dirname, 'node_modules/inferno/dist/index.dev.esm.js')
    }
  }
})
