import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { CaptchaResult, DoctorLoginData, LoginResult } from "./types";

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: DoctorLoginData): AxiosPromise<LoginResult> {
  return request({
    url: "http://localhost:8082/sys/hospital/doctor/login",
    method: "post",
    data: data,
  });
}

/**
 * 注销API
 */
export function logoutApi() {
  return request({
    url: "/api/v1/auth/logout",
    method: "delete",
  });
}

/**
 * 获取验证码
 */
export function getCaptchaApi(): AxiosPromise<CaptchaResult> {
  return request({
    url: "/api/v1/auth/captcha",
    method: "get",
  });
}
