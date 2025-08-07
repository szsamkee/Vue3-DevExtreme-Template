// 本地化文字提取工具
// 这个脚本用于提取项目中的可本地化文字

import fs from 'fs';
import path from 'path';

// 需要处理的文件列表
const filesToProcess = [
  'src/views/home-page.vue',
  'src/components/app-footer.vue',
  'src/components/header-toolbar.vue',
  'src/components/theme-selector.vue',
  'src/App.vue'
];

// 现有的本地化键值对
const existingKeys = {
  // login-form
  "login-form-languagecode": "选择语言",
  "login-form-languagecode-required": "必须选择语言环境", 
  "login-form-orgcode": "组织代码",
  "login-form-orgcode-required": "组织代码不能为空",
  "login-form-usercode": "用户代码",
  "login-form-usercode-required": "用户代码不能为空",
  "login-form-password": "登录密码",
  "login-form-password-required": "登录密码不能为空",
  "login-form-basedate": "基准日期",
  "login-form-basedate-required": "基准日期不能为空",
  "login-form-login-title": "登录系统",
  "login-form-login-button": "登录",
  
  // tasks-page
  "tasks-page-title": "任务列表",
  "tasks-page-task-id": "任务ID",
  "tasks-page-subject": "主题",
  "tasks-page-status": "状态",
  "tasks-page-priority": "优先级", 
  "tasks-page-assigned-to": "分配给",
  "tasks-page-start-date": "开始日期",
  "tasks-page-due-date": "截止日期",
  "tasks-page-completion": "完成度",
  
  // home-page
  "home-page-title": "首页",
  "home-page-welcome": "欢迎使用",
  
  // app-footer
  "app-footer-copyright": "版权所有",
  
  // 通用
  "common-loading": "加载中...",
  "common-error": "错误",
  "common-success": "成功",
  "common-cancel": "取消",
  "common-confirm": "确认",
  "common-save": "保存",
  "common-delete": "删除",
  "common-edit": "编辑",
  "common-add": "添加",
  "common-search": "搜索",
  "common-reset": "重置",
  "common-submit": "提交"
};

// 英文文本提取函数
function extractEnglishTexts(content, filename) {
  const texts = [];
  const pagePrefix = path.basename(filename, '.vue').replace('-', '-');
  
  // 提取模板中的英文文本
  const templateMatch = content.match(/<template[^>]*>([\s\S]*?)<\/template>/);
  if (templateMatch) {
    const template = templateMatch[1];
    
    // 提取标签内的文本 >文本<
    const tagTexts = template.match(/>[^<]*[A-Za-z][^<]*</g);
    if (tagTexts) {
      tagTexts.forEach(text => {
        const cleanText = text.replace(/^>|<$/g, '').trim();
        if (cleanText && /^[A-Za-z\s]+$/.test(cleanText) && cleanText.length > 1) {
          const key = `${pagePrefix}-${cleanText.toLowerCase().replace(/\s+/g, '-')}`;
          texts.push({ key, text: cleanText });
        }
      });
    }
    
    // 提取 caption 属性
    const captions = template.match(/caption="([^"]*)"/g);
    if (captions) {
      captions.forEach(caption => {
        const text = caption.match(/caption="([^"]*)"/)[1];
        if (text && /^[A-Za-z\s]+$/.test(text)) {
          const key = `${pagePrefix}-${text.toLowerCase().replace(/\s+/g, '-')}`;
          texts.push({ key, text });
        }
      });
    }
    
    // 提取 placeholder 等属性中的文本
    const placeholders = template.match(/placeholder="([^"]*)"/g);
    if (placeholders) {
      placeholders.forEach(placeholder => {
        const text = placeholder.match(/placeholder="([^"]*)"/)[1];
        if (text && /^[A-Za-z\s]+$/.test(text)) {
          const key = `${pagePrefix}-${text.toLowerCase().replace(/\s+/g, '-')}`;
          texts.push({ key, text });
        }
      });
    }
  }
  
  return texts;
}

console.log('建议的本地化配置样本（基于tasks-page.vue）：');
console.log(JSON.stringify(existingKeys, null, 2));

export { extractEnglishTexts, existingKeys };
