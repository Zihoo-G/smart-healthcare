import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user/index'

// 创建axios实例
const service = axios.create({
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})
// 请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers.Authorization = accessToken
  }
  return config
})

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data
    if (code === 200) {
      return response.data
    }
    // 响应数据为二进制流处理（Excel导出）
    if (response.data instanceof ArrayBuffer) {
      return response
    }

    ElMessage.error(msg || '系统出错')
    return Promise.reject(new Error(msg || 'Error'))
  },
  (error: any) => {
    if (error.response.data) {
      const { code, msg } = error.response.data
      // token过期，重新登陆
      if (code === 'A0230') {
        ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const userStore = useUserStore()
          userStore.resetToken().then(() => {
            location.reload()
          })
        })
      } else {
        ElMessage.error(msg || '系统出错')
      }
      return Promise.reject(error.message)
    }
  }
)

export default service
