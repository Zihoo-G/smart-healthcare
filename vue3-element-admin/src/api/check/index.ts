import request from "@/utils/request";

export function getSymptomInfo(query: string, size: number) {
  return request({
    url: "http://localhost:8082/sys/hospital/check/symptom",
    method: "get",
    params: { query, size },
  });
}

/**
 * 获取疾病详细信息
 */
export function getSymptomDetail(disease: string) {
  return request({
    url: "http://localhost:8082/sys/hospital/check/disease/desc",
    method: "get",
    params: { disease },
  });
}
