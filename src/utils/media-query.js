// 媒体查询工具模块
// 提供响应式设计支持，监听屏幕尺寸变化并执行相应的处理函数
// 基于CSS媒体查询断点实现不同屏幕尺寸的检测和响应

// === 响应式断点定义 ===
// 定义标准的屏幕尺寸断点，用于响应式设计
const Breakpoints = {
  XSmall: "(max-width: 599.99px)",                          // 超小屏幕：手机竖屏 (0-599.99px)
  Small: "(min-width: 600px) and (max-width: 959.99px)",    // 小屏幕：手机横屏/小平板 (600-959.99px)
  Medium: "(min-width: 960px) and (max-width: 1279.99px)",  // 中等屏幕：平板/小笔记本 (960-1279.99px)
  Large: "(min-width: 1280px)"                              // 大屏幕：桌面/大笔记本 (1280px+)
};

// === 事件处理器管理 ===
// 存储所有注册的屏幕尺寸变化处理函数
let handlers = [];

// === 媒体查询对象创建 ===
// 为每个断点创建媒体查询对象，用于监听屏幕尺寸变化
const xSmallMedia = window.matchMedia(Breakpoints.XSmall);   // 超小屏幕媒体查询
const smallMedia = window.matchMedia(Breakpoints.Small);     // 小屏幕媒体查询
const mediumMedia = window.matchMedia(Breakpoints.Medium);   // 中等屏幕媒体查询
const largeMedia = window.matchMedia(Breakpoints.Large);     // 大屏幕媒体查询

// === 媒体查询事件监听设置 ===
// 为所有媒体查询对象添加变化监听器
[xSmallMedia, smallMedia, mediumMedia, largeMedia].forEach(media => {
  // 当媒体查询状态发生变化时，执行所有注册的处理函数
  media.addEventListener("change",() => {
    // 遍历并调用所有已注册的处理函数
    handlers.forEach(handler => handler());
  });
});

// === 导出函数：获取当前屏幕尺寸状态 ===
// 返回当前屏幕匹配的所有断点状态
// @returns {Object} 包含各个屏幕尺寸匹配状态的对象
export const sizes = () => {
  return {
    "screen-x-small": xSmallMedia.matches,    // 是否匹配超小屏幕
    "screen-small": smallMedia.matches,       // 是否匹配小屏幕
    "screen-medium": mediumMedia.matches,     // 是否匹配中等屏幕
    "screen-large": largeMedia.matches        // 是否匹配大屏幕
  };
};

// === 导出函数：订阅屏幕尺寸变化 ===
// 注册屏幕尺寸变化处理函数
// @param {Function} handler - 屏幕尺寸变化时要执行的处理函数
// @returns {void}
export const subscribe = handler => handlers.push(handler);

// === 导出函数：取消订阅屏幕尺寸变化 ===
// 移除已注册的屏幕尺寸变化处理函数
// @param {Function} handler - 要移除的处理函数
// @returns {void}
export const unsubscribe = handler => {
  // 从处理函数数组中过滤掉指定的处理函数
  handlers = handlers.filter(item => item !== handler);
};
