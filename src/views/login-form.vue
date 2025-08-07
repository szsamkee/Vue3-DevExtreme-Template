<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <dx-form :form-data="formData" :disabled="loading">
      <dx-item data-field="languagecode" editor-type="dxSelectBox" 
        :editor-options="{ stylingMode: 'filled', placeholder: msgLanguageCodePlaceHolder, items: languageList, valueExpr: 'code', displayExpr: 'name', value: currentLanguage, onValueChanged: onLanguageValueChange }">
        <dx-required-rule :message=msgLanguageCodeRequired />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item data-field="orgcode" editor-type="dxSelectBox" 
        :editor-options="{ stylingMode: 'filled', placeholder: msgOrgCodePlaceHolder, items: orgcodeItems, valueExpr: 'code', displayExpr: 'name' }">
        <dx-required-rule :message=msgOrgCodeRequired />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item data-field="usercode" editor-type="dxTextBox"
        :editor-options="{ stylingMode: 'filled', placeholder: msgUserCodePlaceHolder }">
        <dx-required-rule :message=msgUserCodeRequired />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item data-field='password' editor-type='dxTextBox'
        :editor-options="{ stylingMode: 'filled', placeholder: msgPasswordPlaceHolder, mode: 'password' }">
        <dx-required-rule :message=msgPasswordRequired />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item data-field='basedate' editor-type='dxDateBox'
        :editor-options="{ stylingMode: 'filled', placeholder: msgBaseDatePlaceHolder, displayFormat: 'yyyy-MM-dd', type: 'date', pickerType: 'calendar', value: new Date() }">
        <dx-required-rule :message=msgBaseDateRequired />
        <dx-label :visible="false" />
      </dx-item>
      <dx-button-item>
        <dx-button-options width="100%" type="default" template="signInTemplate" :use-submit-behavior="true">
        </dx-button-options>
      </dx-button-item>
      <template #signInTemplate>
        <div>
          <span class="dx-button-text">
            <dx-load-indicator v-if="loading" width="24px" height="24px" :visible="true" />
            <span v-if="!loading">{{msgLoginButton}}</span>
          </span>
        </div>
      </template>
    </dx-form>
  </form>
</template>

<!-- 登录表单页面组件
     提供用户身份验证界面，包含语言选择、组织代码、用户凭据输入等功能
     支持多语言切换和动态组织代码加载 -->

<!-- Vue 3 Script Setup语法，简化组件定义 -->
<script setup>
// === DevExtreme组件导入 ===
// 加载指示器组件，用于显示登录过程中的loading状态
import DxLoadIndicator from "devextreme-vue/load-indicator";

// DevExtreme表单相关组件
import DxForm, {
  DxItem,           // 表单项组件
  DxRequiredRule,   // 必填验证规则组件
  DxLabel,          // 标签组件
  DxButtonItem,     // 按钮项组件
  DxButtonOptions   // 按钮选项组件
} from "devextreme-vue/form";

// DevExtreme通知组件，用于显示成功/错误消息
import notify from 'devextreme/ui/notify';

// === 业务服务导入 ===
// 身份验证服务，处理登录逻辑
import auth from "../auth";

// === Vue 3 Composition API导入 ===
import { reactive, ref, onMounted } from 'vue';  // Vue响应式API和生命周期钩子
import { useRoute, useRouter } from 'vue-router'; // Vue Router钩子

// === 国际化和API服务导入 ===
// 本地化相关函数，支持多语言切换
import { getSupportLanguage, initLocalLanguage, getLocalLanguage, setLocalLanguage, loadLocalMsg } from '../localization/localization'
// API服务，用于获取组织代码等数据
import apiService from '../services/api-service.js';

// === 初始化 ===
// 初始化本地化语言设置，根据用户选择加载相应语言包
initLocalLanguage();

// 获取路由对象，用于页面跳转和参数获取
const route = useRoute();
const router = useRouter();

// === 本地化文本定义 ===
// 创建响应式的本地化文本变量，支持语言切换时的动态更新

// 语言选择相关文本
const msgLanguageCodePlaceHolder = ref(loadLocalMsg('login-form-languagecode'));        // "选择语言"
const msgLanguageCodeRequired = ref(loadLocalMsg('login-form-languagecode-required'));  // "必须选择语言环境"

// 组织代码相关文本
const msgOrgCodePlaceHolder = ref(loadLocalMsg('login-form-orgcode'));                  // "组织代码"
const msgOrgCodeRequired = ref(loadLocalMsg('login-form-orgcode-required'));            // "组织代码不能为空"

// 用户代码相关文本
const msgUserCodePlaceHolder = ref(loadLocalMsg('login-form-usercode'));                // "用户代码"
const msgUserCodeRequired = ref(loadLocalMsg('login-form-usercode-required'));          // "用户代码不能为空"

// 密码相关文本
const msgPasswordPlaceHolder = ref(loadLocalMsg('login-form-password'));                // "登录密码"
const msgPasswordRequired = ref(loadLocalMsg('login-form-password-required'));          // "登录密码不能为空"

// 基准日期相关文本
const msgBaseDatePlaceHolder = ref(loadLocalMsg('login-form-basedate'));                // "基准日期"
const msgBaseDateRequired = ref(loadLocalMsg('login-form-basedate-required'));          // "基准日期不能为空"

// 按钮和提示文本
const msgLoginButton = ref(loadLocalMsg('login-form-login-button'));                    // "登录"
const msgLoginSuccess = ref(loadLocalMsg('login-form-login-success'));                  // "登录成功"

// 当前用户选择的语言代码
const currentLanguage = ref(getLocalLanguage());

// === 数据源定义 ===
// 支持的语言列表，用于语言选择下拉菜单
const languageList = getSupportLanguage();  // [{code:'ZH', name:'中文'}, ...]

// 组织代码列表，响应式数组，从API动态加载
const orgcodeItems = reactive([]);

// === 异步数据加载函数 ===
// 从API获取组织代码数据的异步函数
async function loadOrgCodes() {
  try {
    // 调用API获取组织列表
    const data = await apiService.auth.getOrgs();
    // 使用splice方法更新响应式数组，保持响应性
    orgcodeItems.splice(0, orgcodeItems.length, ...data);
  } catch (error) {
    // 记录错误到控制台，便于开发调试
    console.error('Failed to load organization codes:', error);
    // 注意：错误处理已在httpService中统一处理并显示给用户
    // 这里不需要再显示notify，避免重复提示
  }
}

// === 生命周期钩子 ===
// 组件挂载后立即加载组织代码数据
onMounted(() => {
  loadOrgCodes();
});

// === 表单数据和状态管理 ===
// 登录表单的响应式数据对象
const formData = reactive({
  orgcode: null,      // 组织代码（从下拉选择）
  usercode: "",       // 用户代码
  password: "",       // 登录密码
  basedate: "",       // 基准日期
});

// 登录过程的加载状态标志
const loading = ref(false);

// === 事件处理函数 ===
// 表单提交处理函数
async function onSubmit() {
  // 解构获取表单数据
  const { orgcode, usercode, password, basedate } = formData;
  
  // 开始登录，显示加载状态
  loading.value = true;
  
  // 构造登录请求数据对象
  const loginData = {
    orgcode,    // 组织代码
    usercode,   // 用户代码
    password,   // 密码
    basedate    // 基准日期
  };
  
  // 调用身份验证服务进行登录
  const result = await auth.logIn(loginData);
  
  // 根据登录结果进行相应处理
  if (!result.isOk) {
    // 登录失败：停止加载状态并显示错误消息
    loading.value = false;
    notify(result.message, "error", 2000);   // 显示红色错误提示2秒
  } else {
    // 登录成功：停止加载状态，显示成功消息，然后跳转
    loading.value = false;
    notify(msgLoginSuccess.value, "success", 2000);  // 显示绿色成功提示2秒
    
    // 延迟1秒后跳转，让用户能看到成功提示
    setTimeout(() => {
      // 跳转到原始目标页面（如果有）或默认首页
      router.push(route.query.redirect || "/home");
    }, 1000);
  }
}

// 语言选择变化处理函数
function onLanguageValueChange(e) {
  // 保存用户选择的新语言到localStorage
  setLocalLanguage(e.value);
  
  // 重新加载页面以应用新语言设置
  // 注意：这会触发整个应用重新初始化，包括重新加载语言包
  document.location.reload();
}
</script>

<!-- 组件样式定义 -->
<style lang="scss">
// 导入主题基础变量
@import "../themes/generated/variables.base.scss";

// 登录表单容器样式
.login-form {
  // 链接样式（如果有的话）
  .link {
    text-align: center;   // 居中对齐
    font-size: 16px;      // 字体大小
    font-style: normal;   // 正常字体样式

    // 链接标签样式
    a {
      text-decoration: none;  // 移除下划线
    }
  }

  // 表单文本样式
  .form-text {
    margin: 10px 0;       // 上下外边距
    // 使用主题变量设置半透明的文本颜色
    color: rgba($base-text-color, alpha($base-text-color) * 0.7);
  }
}
</style>
