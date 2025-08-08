// API服务抽象层
// 在HTTP服务之上提供业务逻辑API接口的抽象
// 将具体的API端点和参数封装成语义化的方法，便于组件调用

// 导入底层HTTP服务，用于实际的网络请求
import httpService from './http-service.js';

// API服务类，组织所有业务API接口
class ApiService {
  // 认证相关API模块
  // 包含用户登录、登出、权限验证等身份认证功能
  auth = {
    // 获取组织列表接口
    // 用于登录页面的组织代码下拉选择
    // 返回值：Promise<Array> - 组织列表数组
    async getOrgs() {
      return await httpService.get('/Auth/GetOrgs');
    },

    // 用户登录接口
    // 参数：loginData - 登录表单数据对象
    //   {
    //     orgcode: string,    // 组织代码
    //     usercode: string,   // 用户代码
    //     password: string,   // 登录密码
    //     basedate: string    // 基准日期
    //   }
    // 返回值：Promise<{token: string, ...}> - 包含JWT token的响应对象
    async login(loginData) {
      // 传递完整的登录数据到服务器进行身份验证
      return await httpService.post('/Auth/Login', loginData);
    },

    // 用户登出接口
    // 通知服务器当前用户会话结束，清理服务端session
    // 返回值：Promise<void>
    async logout() {
      return await httpService.post('/Auth/Logout');
    },

    // 刷新JWT token接口
    // 在token即将过期时获取新的token，避免用户重新登录
    // 返回值：Promise<{token: string}> - 新的JWT token
    async refreshToken() {
      return await httpService.post('/Auth/RefreshToken');
    },

    // 获取当前用户详细信息接口
    // 用于获取登录用户的完整资料信息
    // 返回值：Promise<UserObject> - 用户信息对象
    async getUserInfo() {
      return await httpService.get('/Auth/UserInfo');
    },

    // 获取用户菜单项接口
    // 根据用户权限动态获取可访问的菜单结构
    // 返回值：Promise<Array> - 菜单项数组，用于构建导航菜单
    async getMenuItems() {
      var currentLanguage = window.localStorage["localizationLanguage"];
      if (!currentLanguage) { // 如果没有设置语言，默认使用中文
        currentLanguage = "ZH-CN";
      }
      return await httpService.get('/Auth/GetMenuItems', { params: { language: currentLanguage } });
    }
  };

  // 预留：用户管理相关API模块
  // 可以在这里添加用户资料、设置等相关接口
  // 例如：
  // user = {
  //   // 获取用户个人资料
  //   async getProfile() {
  //     return await httpService.get('/User/Profile');
  //   },
  //   
  //   // 更新用户资料
  //   async updateProfile(profileData) {
  //     return await httpService.put('/User/Profile', profileData);
  //   }
  // };

  // 预留：任务管理相关API模块
  // 可以在这里添加任务列表、创建、更新等接口
  // 例如：
  // task = {
  //   // 获取任务列表
  //   async getTasks() {
  //     return await httpService.get('/Task/List');
  //   },
  //   
  //   // 创建新任务
  //   async createTask(taskData) {
  //     return await httpService.post('/Task/Create', taskData);
  //   }
  // };
}

// 创建API服务的单例实例，确保整个应用使用同一个实例
const apiService = new ApiService();

// 导出单例实例供其他模块使用
export default apiService;
