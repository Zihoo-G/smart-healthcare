import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { DrugPageResult, DrugQuery } from "./types";
import { SubmitDrugInfo } from "@/api/check/types";
/**
 * 获取角色分页数据
 *
 * @param queryParams
 */
export function getDrugPage(
  pageNum: number,
  pageSize: number,
  queryParams?: DrugQuery
): AxiosPromise<DrugPageResult> {
  return request({
    url: `http://localhost:8081/sys/drug/list/${pageNum}/${pageSize}`,
    method: "post",
    data: queryParams,
  });
}

/**
 * 批量添加recipe
 */
export function batchAddRecipe(data: SubmitDrugInfo) {
  return request({
    url: "http://localhost:8082/sys/hospital/recipe/batch/add",
    method: "post",
    data,
  });
}

/**
 * 根据药物名字找到id
 */
export function getDrugInfoByName(name: string) {
  return request({
    url: `http://localhost:8081/sys/drug/list/name`,
    method: "get",
    params: { name },
  });
}

/**
 * 获取开具的处方信息
 */
export function getRecipeInfo(
  name: string,
  date: string,
  pageNum: number,
  pageSize: number
) {
  return request({
    url: `http://localhost:8082/sys/hospital/recipe/list/recipe/${pageNum}/${pageSize}`,
    method: "get",
    params: { name, date },
  });
}

/**
 * 处方药品出库
 */
export function outBoundRecipe(recipeIds: (number | number[])[]) {
  return request({
    url: "http://localhost:8082/sys/hospital/recipe/outbound",
    method: "post",
    data: recipeIds,
  });
}
