// 主题管理服务
// 提供应用主题切换、存储和CSS样式表动态管理功能
// 支持多种颜色主题（橙色、蓝色、紫色）和明暗模式

// 导入DevExtreme图表主题相关函数
import { currentTheme, refreshTheme } from 'devextreme/viz/themes';

export default {
    // 本地存储键名，用于持久化保存用户选择的主题
    storageKey: "themeViewer",
   
    // === 主题获取和数据管理 ===
    
    // 从本地存储获取当前主题设置
    getTheme(){
        return window.localStorage[this.storageKey]
    },

    // 获取可用主题数据列表
    // 返回包含主题名称、值和图标的数组
    getThemeData(){
        return [
            { text: "Orange Light", value: "orange.light", ImageSrc: "/icons/Component1.svg"},    // 橙色浅色主题
            { text: "Blue Light", value: "blue.light", ImageSrc: "/icons/Component2.svg" },      // 蓝色浅色主题
            { text: "Purple Light", value: "purple.light", ImageSrc: "/icons/Component3.svg" }, // 紫色浅色主题
            { text: "Purple Dark", value: "purple.dark", ImageSrc: "/icons/Component4.svg" }    // 紫色深色主题
        ]
    },

    // === 基础主题应用函数 ===
    
    // 应用DevExtreme基础主题样式
    // @param {string} theme - 主题名称 (如: "orange.light")  
    // @param {string} themeMarker - 主题标记 (如: "dx.material.")
    applyBaseTheme(theme, themeMarker){
        // 遍历页面中的所有样式表
        for(let index in document.styleSheets) {
            let styleSheet = document.styleSheets[index],
                href = styleSheet.href;
            
            if(href) {
                // 查找包含主题标记的样式表
                let themeMarkerPosition = href.indexOf(themeMarker);
                
                if(themeMarkerPosition >= 0) {
                    // 解析样式表文件名中的主题部分
                    let startPosition = themeMarkerPosition + themeMarker.length,
                        endPosition = href.indexOf(".css"),
                        fileNamePart = href.substring(startPosition, endPosition);
                    
                    // 如果找到匹配的主题文件，提取强调色CSS变量
                    if (fileNamePart === theme) {
                        // 遍历CSS规则，找到强调色定义
                        for (let i=0; i<styleSheet.cssRules.length;i++){
                            let cssRule = styleSheet.cssRules.item(i)
                            // 找到强调色规则并设置CSS自定义属性
                            if (cssRule?.selectorText === ".dx-theme-accent-as-text-color") {
                                document.documentElement.style.setProperty('--base-accent',cssRule.style.color)
                            }
                        }
                        
                    }
                    // 根据主题匹配情况启用或禁用样式表
                    styleSheet.disabled = fileNamePart != theme;
                }
            }
        }
    },

    // === 主题变量应用函数 ===
    
    // 根据明暗模式应用对应的CSS变量
    // @param {string} accent - 主题模式 ("light" 或 "dark")
    applySwatchVariables(accent){
        if (accent === 'light') {
            // 浅色主题的颜色变量设置
            document.documentElement.style.setProperty('--base-border-color',"#F3F3F3")      // 边框颜色：浅灰
            document.documentElement.style.setProperty('--base-bg',"rgba(0, 0, 0, 0.16)")   // 背景色：半透明黑
            document.documentElement.style.setProperty('--icon-color',"rgba(0, 0, 0, 0.54)") // 图标颜色：半透明黑
        } else {
            // 深色主题的颜色变量设置
            document.documentElement.style.setProperty('--base-border-color',"#464650")        // 边框颜色：深灰
            document.documentElement.style.setProperty('--base-bg',"rgba(255, 255, 255, 0.10)") // 背景色：半透明白
            document.documentElement.style.setProperty('--icon-color',"rgba(255, 255, 255, 0.87)") // 图标颜色：半透明白
        }
    },

    // === 附加主题样式应用函数 ===
    
    // 应用附加主题样式表（如自定义组件样式）
    // @param {string} accent - 主题模式 ("light" 或 "dark")
    // @param {string} themeMarker - 主题标记 (如: "theme.additional")
    applySwatchTheme(accent, themeMarker){
        // 遍历页面中的所有样式表
        for(let index in document.styleSheets) {
            let styleSheet = document.styleSheets[index],
                href = styleSheet.href;
            
            if(href) {
                // 查找包含主题标记的样式表
                let themeMarkerPosition = href.indexOf(themeMarker);
                
                if(themeMarkerPosition >= 0) {
                    // 解析样式表文件名中的主题部分
                    let startPosition = themeMarkerPosition + themeMarker.length,
                        endPosition = href.indexOf(".css"),
                        fileNamePart = href.substring(startPosition, endPosition);
                    
                    // 根据主题模式匹配情况启用或禁用样式表
                    // 提取文件名中的模式部分（light/dark）进行匹配
                    styleSheet.disabled = !(accent === fileNamePart.substring(fileNamePart.indexOf('.')+1))
                }
            }
        }
    },

    // === 主主题应用函数 ===
    
    // 应用完整主题，包括基础主题、变量和附加样式
    // @param {string} theme - 主题名称，如果未提供则使用存储的主题或默认主题
    applyTheme(theme) {
        // 主题优先级：传入参数 > 本地存储 > 默认主题(orange.light)
        theme = theme || window.localStorage[this.storageKey] || "orange.light";
        
        // 应用DevExtreme基础材料主题
        this.applyBaseTheme(theme,"dx.material.")
        
        // 提取主题中的模式部分（light/dark）
        let accent = theme?.substring(theme?.indexOf('.')+1)
        
        // 应用主题相关的CSS变量
        this.applySwatchVariables(accent)

        // 应用附加主题样式
        this.applySwatchTheme(accent,"theme.additional")
        
        // 将主题选择保存到本地存储
        window.localStorage[this.storageKey] = theme;
        
        // 应用DevExtreme图表组件主题
        currentTheme('material.' + theme);
        // 刷新DevExtreme主题，确保所有组件应用新主题
        refreshTheme();
    }

}