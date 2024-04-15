import { type UserInfo, type UserForm } from '@/api/user/types'
import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { loginApi, registerApi, getUserInfoApi } from '@/api/user/index'
export const useUserStore = defineStore('user', () => {
  const user = reactive<UserInfo>({ id: 0, username: '' })
  /**
   * 登录
   * @param loginData
   */
  function login(loginData: UserForm) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((response) => {
          const { tokenType, accessToken, username, id } = response.data
          // 将token输入到缓存
          localStorage.setItem('accessToken', tokenType + ' ' + accessToken)
          user.username = username
          user.id = id
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  /**
   * 获取用户信息
   */
  function getUserInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      getUserInfoApi().then((response) => {
        if (!response.data) {
          reject('Verification failed, please Login again.')
          return
        }

        Object.assign(user, response.data)
        resolve(response.data)
      })
    })
  }
  /**
   * 登出
   */
  function logout() {
    localStorage.setItem('accessToken', '')
  }

  // reset token
  function resetToken() {
    return new Promise<void>((resolve) => {
      localStorage.setItem('accessToken', '')
      resolve()
    })
  }

  return { user, login, getUserInfo, logout, resetToken }
})
