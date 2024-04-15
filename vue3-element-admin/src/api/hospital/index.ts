import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { DoctorForm, DoctorQuery, PatientQueryForm, CheckInfo } from "./types";
/**
 * 获取科室数据结构数据
 */
export function getDepartmentTree() {
  return request({
    url: "http://localhost:8082/sys/hospital/department/tree",
    method: "get",
  });
}
/**
 * 添加医生信息
 */
export function addDoctor(doctor: DoctorForm) {
  return request({
    url: "http://localhost:8082/sys/hospital/doctor/add",
    method: "post",
    data: doctor,
  });
}

/**
 * 根据id删除医生信息
 */
export function removeDoctor(id: number) {
  return request({
    url: `http://localhost:8082/sys/hospital/doctor/delete/${id}`,
    method: "post",
  });
}

/**
 * 根据ids批量删除医生信息
 */
export function removeDoctors(ids: Array<number>) {
  return request({
    url: "http://localhost:8082/sys/hospital/doctor/delete",
    method: "post",
    data: ids,
  });
}
/**
 * 修改医生信息
 */
export function updateDoctor(doctor: DoctorForm) {
  return request({
    url: "http://localhost:8082/sys/hospital/doctor/update",
    method: "post",
    data: doctor,
  });
}
/**
 * 获取医生分页数据
 */
export function getDoctorPage(
  pgeNum: number,
  pageSize: number,
  doctorVo: DoctorQuery
) {
  return request({
    url: `http://localhost:8082/sys/hospital/doctor/list/${pgeNum}/${pageSize}`,
    method: "post",
    data: doctorVo,
  });
}

/**
 * 根据id获取医生信息
 */
export function getDoctorById(id: number) {
  return request({
    url: `http://localhost:8082/sys/hospital/doctor/get/${id}`,
    method: "get",
  });
}
/**
 * 根据部门获取医生信息
 */
export function getDoctorByDept(deptId: number) {
  return request({
    url: `http://localhost:8082/sys/hospital/doctor/get/dept/${deptId}`,
    method: "get",
  });
}

/**
 * 获取排班医生数据
 */
export function getScheduleDoctor(days: number, deptId: number) {
  return request({
    url: `http://localhost:8082/sys/hospital/doctor/schedule/list/${days}/${deptId}`,
    method: "get",
  });
}
/**
 * 添加医生排班数据
 */
export function addDoctorSchedules(data) {
  return request({
    url: `http://localhost:8082/sys/hospital/doctor/schedule/add`,
    method: "post",
    data,
  });
}

/**
 * 获取预约医生的患者数据
 */
export function getPatientsInfo(data: PatientQueryForm) {
  return request({
    url: "http://localhost:8082/sys/hospital/doctor/patient/info",
    method: "post",
    data,
  });
}

/**
 * 检查信息添加
 */
export function addCheck(data: CheckInfo) {
  return request({
    url: "http://localhost:8082/sys/hospital/check/add",
    method: "post",
    data,
  });
}

/**
 * 患者检查信息查看
 */
export function getCheckList(id: number) {
  return request({
    url: `http://localhost:8082/sys/hospital/check/list/${id}`,
    method: "get",
  });
}
