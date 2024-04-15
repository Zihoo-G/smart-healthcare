import request from '@/utils/request'

/**
 * AI科室推荐
 */
export function getRecommendDepartments(symptom: string, sex: string, age: number, size: number) {
  return request({
    url: 'http://localhost:8083/user/qa/recommendation',
    method: 'get',
    params: {
      symptom,
      sex,
      age,
      size
    }
  })
}
