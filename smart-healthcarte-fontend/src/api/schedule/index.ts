import request from '@/utils/request'

/**
 * 获取科室排班信息
 * @param deptId 科室id
 */
export function getSchedules(days: number, deptId: number) {
  return request({
    url: `http://localhost:8082/sys/hospital/doctor/schedule/list/${days}/${deptId}`,
    method: 'get'
  })
}
