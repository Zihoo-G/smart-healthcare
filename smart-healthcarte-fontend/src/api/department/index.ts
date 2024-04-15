import request from '@/utils/request'

export function getDepartmentTree() {
  return request({
    url: 'http://localhost:8082/sys/hospital/department/tree',
    method: 'get'
  })
}

/**
 * 根据id获取科室信息
 */
export function getDepartmentInfo(id: number) {
  return request({
    url: `http://localhost:8082/sys/hospital/department/info/${id}`,
    method: 'get'
  })
}
