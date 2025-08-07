// Vue CLI项目配置文件
// 虽然项目主要使用Vite作为构建工具，但保留此文件以兼容某些Vue CLI工具
// 提供Vue项目的构建和部署相关配置选项

module.exports = {
  // === 公共路径配置 ===
  // 设置应用的基础URL路径，用于部署时的资源引用
  publicPath: "/", // 根路径部署，适用于域名根目录或开发环境
  
  // 其他可用配置选项（根据需要取消注释并配置）：
  
  // outputDir: 'dist',              // 构建输出目录
  // assetsDir: 'static',            // 静态资源目录
  // indexPath: 'index.html',        // HTML入口文件路径
  // filenameHashing: true,          // 文件名哈希（用于缓存优化）
  
  // devServer: {                    // 开发服务器配置
  //   port: 8080,                   // 开发服务器端口
  //   open: true,                   // 自动打开浏览器
  //   proxy: {                      // API代理配置
  //     '/api': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // },
  
  // configureWebpack: {             // Webpack配置扩展
  //   // 自定义Webpack配置
  // },
  
  // chainWebpack: config => {       // Webpack链式配置
  //   // 链式修改Webpack配置
  // }
};
