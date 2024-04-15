import request from "@/utils/request";
import { AxiosPromise } from "axios";
import {
  ManufacturerQuery,
  ManufacturerPageResult,
  ManufacturerForm,
} from "./types";

/**
 * 获取供应商分页数据
 *
 * @param queryParams
 */
export function getManufacturerPage(
  pageNum: number,
  pageSize: number,
  queryParams?: ManufacturerQuery
): AxiosPromise<ManufacturerPageResult> {
  return request({
    url: `http://localhost:8081/sys/drug/manufacturer/list/${pageNum}/${pageSize}`,
    method: "post",
    data: queryParams,
  });
}

/**
 * 根据id获取供应商信息
 */
export function getManufacturerById(id: number) {
  return request({
    url: `http://localhost:8081/sys/drug/manufacturer/get/${id}`,
    method: "get",
  });
}

/**
 * 添加供应商
 */
export function addManufacturer(manufacturerForm: ManufacturerForm) {
  return request({
    url: "http://localhost:8081/sys/drug/manufacturer/add",
    method: "post",
    data: manufacturerForm,
  });
}

/**
 * 删除供应商
 */
export function removeManufacturer(id: number) {
  return request({
    url: `http://localhost:8081/sys/drug/manufacturer/delete/${id}`,
    method: "delete",
  });
}
/**
 * 批量删除供应商
 */
export function removeManufacturers(ids: Array<number>) {
  return request({
    url: "http://localhost:8081/sys/drug/manufacturer/delete",
    method: "delete",
    data: ids,
  });
}

/**
 * 修改供应商信息
 */
export function updateManufacturer(manufacturerForm: ManufacturerForm) {
  return request({
    url: "http://localhost:8081/sys/drug/manufacturer/update",
    method: "post",
    data: manufacturerForm,
  });
}
