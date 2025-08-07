// 国际化(i18n)服务模块
// 负责多语言支持、语言切换和本地化文本管理
// 支持中文(ZH)、越南语(VI)、日语(JA)三种语言

// 导入自定义语言包文件
import locale_Zh_Message from './localization.zh.json';    // 中文语言包
import locale_Vi_Message from './localization.vi.json';    // 越南语语言包
import locale_Ja_Message from './localization.ja.json';    // 日语语言包

// 导入DevExtreme组件库的官方语言包
import cnMessage from 'devextreme/localization/messages/zh.json'  // DevExtreme中文
import viMessage from 'devextreme/localization/messages/vi.json'  // DevExtreme越南语
import jaMessage from 'devextreme/localization/messages/ja.json'  // DevExtreme日语

// 导入DevExtreme的本地化API
import { locale, loadMessages } from "devextreme/localization";

// 全局变量：当前激活的语言代码
var currentLanguage = getLocalLanguage();

// 获取支持的语言列表
// 返回值：Array<{code: string, name: string}> - 语言选项数组
// 用于登录页面的语言选择下拉菜单
export function getSupportLanguage() {
    return [
        {code:'ZH', name:'中文'},          // 中文选项
        {code:'VI', name:'Tiếng Việt'},   // 越南语选项
        {code:'JA', name:'日本語'}        // 日语选项
    ];
}

// 初始化本地化语言设置
// 根据用户选择的语言加载相应的DevExtreme语言包和设置locale
// 在应用启动时和语言切换时调用
export function initLocalLanguage() {
    // 获取当前用户选择的语言
    currentLanguage = getLocalLanguage();
    
    // 根据语言代码加载对应的DevExtreme语言包
    if (currentLanguage == "ZH") {
        loadMessages(cnMessage);    // 加载中文语言包到DevExtreme
        locale("zh-CN");           // 设置DevExtreme的locale为中文
    }
    else if (currentLanguage == "VI") {
        loadMessages(viMessage);    // 加载越南语语言包到DevExtreme
        locale("vi-VN");           // 设置DevExtreme的locale为越南语
    }
    else if (currentLanguage == "JA") {
        loadMessages(jaMessage);    // 加载日语语言包到DevExtreme
        locale("ja-JP");           // 设置DevExtreme的locale为日语
    }
}

// 获取当前本地化语言设置
// 从localStorage读取用户的语言偏好，如果没有设置则默认为中文
// 返回值：string - 语言代码（ZH/VI/JA）
export function getLocalLanguage() {
    // 从localStorage读取语言设置
    currentLanguage = window.localStorage["localizationLanguage"];
    
    // 如果没有设置过语言，默认使用中文
    if (!currentLanguage) {
        currentLanguage = "ZH";
        // 将默认语言保存到localStorage
        window.localStorage["localizationLanguage"] = currentLanguage;
    }
    
    // 确保返回大写的语言代码
    return currentLanguage.toUpperCase();
}

// 设置本地化语言
// 将用户选择的语言保存到localStorage，下次访问时生效
// 参数：language - 语言代码（ZH/VI/JA）
export function setLocalLanguage(language) {
    // 将语言代码转换为大写并保存到localStorage
    window.localStorage["localizationLanguage"] = language.toUpperCase();
}

// 加载本地化消息文本
// 根据当前语言设置和消息ID获取对应的本地化文本
// 参数：msgId - 消息ID（如："login-form-usercode"）
// 返回值：string - 本地化后的文本内容
export function loadLocalMsg(msgId) {
    try {
        var msg = "";
        
        // 根据当前语言从对应的语言包中获取文本
        switch (currentLanguage) {
            case "ZH":
                // 从中文语言包获取文本
                msg = locale_Zh_Message[msgId];
                break;
            case "VI":
                // 从越南语语言包获取文本
                msg = locale_Vi_Message[msgId];
                break;
            case "JA":
                // 从日语语言包获取文本
                msg = locale_Ja_Message[msgId];
                break;
            default:
                // 未知语言代码的错误提示
                msg = "Undefined current language.";
        }
        
        return msg;
    }
    catch {
        // 如果获取文本时发生异常，返回未翻译提示
        // 这通常表示msgId不存在或语言包文件有问题
        return "Untranslated message with id:" + msgId;
    }
};
