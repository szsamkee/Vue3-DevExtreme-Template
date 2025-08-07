// HTTP服务类 - 基于Axios的HTTP客户端封装
// 提供统一的API请求接口、JWT Token管理、错误处理和调试功能

// 导入Axios HTTP客户端库
import axios from 'axios';
// 导入DevExtreme的通知组件，用于显示错误信息
import notify from 'devextreme/ui/notify';

// HTTP服务类，封装所有API请求逻辑
class HttpService {
  // 构造函数，初始化Axios实例和拦截器
  constructor() {
    // 创建axios实例，配置基础设置
    this.api = axios.create({
      baseURL: 'https://localhost:7117/api', // API服务器基础地址
      timeout: 10000,                        // 请求超时时间（10秒）
      headers: {
        'Content-Type': 'application/json',  // 默认请求头，指定JSON格式
      }
    });

    // 设置请求拦截器，在每个请求发送前执行
    this.api.interceptors.request.use(
      (config) => {
        // 只在开发环境显示调试信息，避免生产环境暴露敏感数据
        if (import.meta.env.DEV) {
          console.log('HTTP Request:', {
            method: config.method,          // 请求方法（GET、POST等）
            url: config.url,               // 请求URL
            data: config.data,             // 请求数据
            headers: config.headers        // 请求头
          });
        }
        
        // 自动添加JWT token到请求头，实现身份验证
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // 请求发送失败时的处理
        return Promise.reject(error);
      }
    );

    // 设置响应拦截器，在收到响应后执行
    this.api.interceptors.response.use(
      (response) => {
        // 只在开发环境显示响应调试信息
        if (import.meta.env.DEV) {
          console.log('HTTP Response:', {
            status: response.status,        // 响应状态码
            data: response.data,           // 响应数据
            headers: response.headers      // 响应头
          });
        }
        return response;
      },
      (error) => {
        // 只在开发环境显示详细错误信息
        if (import.meta.env.DEV) {
          console.error('HTTP Error:', {
            status: error.response?.status, // 错误状态码
            data: error.response?.data,     // 错误数据
            message: error.message,         // 错误消息
            config: error.config           // 请求配置
          });
        }
        
        // 统一错误处理，显示用户友好的错误提示
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  // 获取存储的JWT token
  // 优先从localStorage获取（记住密码），其次从sessionStorage获取（不记住密码）
  getToken() {
    return localStorage.getItem('jwt_token') || sessionStorage.getItem('jwt_token');
  }

  // 设置JWT token到本地存储
  // rememberMe: true表示记住密码（使用localStorage），false表示关闭浏览器后过期（使用sessionStorage）
  setToken(token, rememberMe = false) {
    if (rememberMe) {
      // 记住密码：存储到localStorage（持久化）
      localStorage.setItem('jwt_token', token);
      sessionStorage.removeItem('jwt_token');
    } else {
      // 不记住密码：存储到sessionStorage（会话级别）
      sessionStorage.setItem('jwt_token', token);
      localStorage.removeItem('jwt_token');
    }
  }

  // 清除所有存储的JWT token，用于登出操作
  clearToken() {
    localStorage.removeItem('jwt_token');
    sessionStorage.removeItem('jwt_token');
  }

  // 统一错误处理函数，根据不同的错误类型显示相应的用户提示
  handleError(error) {
    let message = 'An error occurred'; // 默认错误消息
    
    if (error.response) {
      // 服务器返回了错误状态码的情况
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          // 客户端请求错误
          message = data?.message || 'Bad request. Please check your input data.';
          // 只在开发环境显示详细错误信息，便于调试
          if (import.meta.env.DEV) {
            console.error('400 Error Details:', data);
          }
          break;
        case 401:
          // 未授权访问，token可能已过期
          message = 'Unauthorized access. Please login again.';
          this.clearToken(); // 清除无效token
          // 可以在这里自动跳转到登录页面
          // window.location.href = '/login';
          break;
        case 403:
          // 禁止访问，权限不足
          message = 'Access forbidden.';
          break;
        case 404:
          // 资源未找到
          message = 'Resource not found.';
          break;
        case 500:
          // 服务器内部错误
          message = 'Internal server error.';
          break;
        default:
          // 其他状态码
          message = data?.message || `Error: ${status}`;
      }
    } else if (error.request) {
      // 请求发出但没有收到响应（网络问题）
      message = 'Network error. Please check your connection.';
    } else {
      // 其他类型的错误（请求配置错误等）
      message = error.message || 'Unknown error occurred.';
    }

    // 只在开发环境显示详细错误日志
    if (import.meta.env.DEV) {
      console.error('HTTP Error:', error);
    }
    
    // 使用DevExtreme的notify组件显示错误提示，3秒后自动消失
    notify(message, 'error', 3000);
  }

  // GET请求方法 - 获取数据
  async get(url, config = {}) {
    try {
      const response = await this.api.get(url, config);
      return response.data; // 返回响应数据
    } catch (error) {
      throw error; // 抛出错误供调用者处理
    }
  }

  // POST请求方法 - 创建数据
  async post(url, data = {}, config = {}) {
    try {
      const response = await this.api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // PUT请求方法 - 更新数据（完整更新）
  async put(url, data = {}, config = {}) {
    try {
      const response = await this.api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // DELETE请求方法 - 删除数据
  async delete(url, config = {}) {
    try {
      const response = await this.api.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // PATCH请求方法 - 部分更新数据
  async patch(url, data = {}, config = {}) {
    try {
      const response = await this.api.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// 创建HTTP服务的单例实例，确保整个应用使用同一个实例
const httpService = new HttpService();

// 导出单例实例供其他模块使用
export default httpService;
