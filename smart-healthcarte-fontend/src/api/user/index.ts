import request from '@/utils/request'
import { type UserForm } from '@/api/user/types'
/**
 * 用户注册接口
 */
export function registerApi(user: UserForm) {
  return request({
    url: 'http://localhost:8083/user/register',
    method: 'post',
    data: user
  })
}
/**
 * 获取用户信息
 */
export function getUserInfoApi() {
  return request({
    url: 'http://localhost:8083/user/info',
    method: 'get'
  })
}

/**
 * 用户登录接口
 */
export function loginApi(user: UserForm) {
  return request({
    url: 'http://localhost:8083/user/login',
    method: 'post',
    data: user
  })
}

/**
 * 用户预约挂号接口
 * @param scheduleId 排班表id
 * @param userId 用户id
 */
export function appointmentApi(scheduleId: number, userId: number) {
  return request({
    url: `http://localhost:8083/user/appointment/${scheduleId}/${userId}`,
    method: 'get'
  })
}

/**
 * 根据uid查询诊断结果
 */
export function getCheckInfoByUserId(userId: number) {
  return request({
    url: `http://localhost:8082/sys/hospital/check/list/${userId}`,
    method: 'get'
  })
}

/**
 * 查询诊断的详细信息
 */
export function getCheckDetailInfo(disease: string) {
  return request({
    url: 'http://localhost:8082/sys/hospital/check/disease/desc',
    method: 'get',
    params: { disease }
  })
}

/**
 * 查询处方详细信息
 */
export function getRecipe(pageNum: number, limitNum: number, id: number) {
  return request({
    url: `http://localhost:8082/sys/hospital/recipe/list/recipe/${pageNum}/${limitNum}`,
    method: 'get',
    params: { id }
  })
}
