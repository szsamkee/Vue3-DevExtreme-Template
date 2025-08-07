// 身份验证服务模块
// 负责处理用户登录、登出、token管理和用户状态管理
// 作为应用的身份验证中心，被路由守卫和组件调用

// 导入API服务，用于与后端身份验证接口通信
import apiService from './services/api-service.js';
// 导入HTTP服务，用于token管理
import httpService from './services/http-service.js';
// 导入本地化函数，用于错误消息的多语言支持
import { loadLocalMsg } from './localization/localization.js';

// 默认用户状态为null，表示未登录
const defaultUser = null
/*
// 用户对象示例结构（注释掉的示例）
{
  email: 'sandra@example.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
};
*/

// 导出身份验证服务对象，包含所有认证相关方法
export default {
  // 私有属性：当前登录用户信息
  _user: defaultUser,
  
  // 检查用户是否已登录
  // 返回值：boolean - true表示已登录，false表示未登录
  loggedIn() {
    // 同时检查用户信息和有效token，两者都存在才认为已登录
    return !!this._user && !!httpService.getToken();
  },

  // 用户登录方法
  // 参数：loginData - 登录表单数据对象（包含用户名、密码等）
  // 返回值：Promise<{isOk: boolean, data?: object, message?: string}>
  async logIn(loginData) {
    try {
      // 调用API服务发送登录请求到后端
      const response = await apiService.auth.login(loginData);
      
      // 检查服务器响应是否包含有效的JWT token
      if (response && response.token) {
        // 存储JWT token到本地（默认使用sessionStorage，不记住密码）
        httpService.setToken(response.token, false);
        
        // 存储用户基本信息到内存中
        this._user = { usercode: loginData.usercode };
        
        // 返回成功结果
        return {
          isOk: true,
          data: this._user
        };
      } else {
        // 服务器响应无效，返回本地化的错误消息
        return {
          isOk: false,
          message: loadLocalMsg("auth-invalid-response")
        };
      }
    }
    catch (error) {
      // 捕获登录过程中的异常，返回错误信息
      return {
        isOk: false,
        // 优先使用服务器返回的错误消息，否则使用本地化的通用错误消息
        message: error.response?.data?.message || loadLocalMsg("auth-authentication-failed")
      };
    }
  },

  // 用户登出方法
  // 清除本地存储的用户信息和token
  async logOut() {
    try {
      // 尝试调用API通知服务器用户登出（可选操作）
      await apiService.auth.logout();
    } catch (error) {
      // 即使API调用失败也继续清除本地数据，确保用户能够登出
      console.warn(loadLocalMsg("auth-logout-failed") + ':', error);
    } finally {
      // 无论API调用是否成功，都要清除本地用户状态
      this._user = null;                    // 清除内存中的用户信息
      httpService.clearToken();            // 清除本地存储的JWT token
    }
  },

  // 获取当前用户信息方法
  // 如果本地没有用户信息但有有效token，会尝试从服务器获取
  // 返回值：Promise<{isOk: boolean, data?: object, message?: string}>
  async getUser() {
    try {
      // 如果内存中没有用户信息但存在有效token，从API获取用户详情
      if (!this._user && httpService.getToken()) {
        const userData = await apiService.auth.getUserInfo();
        this._user = userData;              // 更新内存中的用户信息
      }

      // 返回当前用户信息
      return {
        isOk: true,
        data: this._user
      };
    }
    catch (error) {
      // 获取用户信息失败
      return {
        isOk: false,
        message: error.response?.data?.message || loadLocalMsg("auth-get-user-failed")
      };
    }
  },

  // 重置密码方法（当前为空实现，预留接口）
  // 参数：email - 用户邮箱地址
  // 返回值：Promise<{isOk: boolean, message?: string}>
  async resetPassword(email) {
    try {
      // TODO: 这里可以调用重置密码的API接口
      console.log(email);

      // 临时返回成功状态
      return {
        isOk: true
      };
    }
    catch {
      // 重置密码失败
      return {
        isOk: false,
        message: loadLocalMsg("auth-reset-password-failed")
      };
    }
  },

  // 修改密码方法（当前为空实现，预留接口）
  // 参数：email - 用户邮箱，recoveryCode - 恢复代码
  // 返回值：Promise<{isOk: boolean, message?: string}>
  async changePassword(email, recoveryCode) {
    try {
      // TODO: 这里可以调用修改密码的API接口
      console.log(email, recoveryCode);

      // 临时返回成功状态
      return {
        isOk: true
      };
    }
    catch {
      // 修改密码失败
      return {
        isOk: false,
        message: loadLocalMsg("auth-change-password-failed")
      }
    }
  },

  // 创建账户方法（当前为空实现，预留接口）
  // 参数：email - 用户邮箱，password - 密码
  // 返回值：Promise<{isOk: boolean, message?: string}>
  async createAccount(email, password) {
    try {
      // TODO: 这里可以调用创建账户的API接口
      console.log(email, password);

      // 临时返回成功状态
      return {
        isOk: true
      };
    }
    catch {
      // 创建账户失败
      return {
        isOk: false,
        message: loadLocalMsg("auth-create-account-failed")
      };
    }
  }
};
