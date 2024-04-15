package com.gazikel.common.result;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
@Getter
@AllArgsConstructor
public enum ReturnCodeEnum {
    SUCCESS(200, "成功，返回值200"),
    FAIL(201, "失败"),
    PARAM_ERROR(202, "参数不正确"),
    SERVICE_ERROR(203, "服务器异常"),
    DATA_ERROR(204, "数据异常"),
    DATA_UPDATE_ERROR(205, "数据版本异常");

    // 自定义状态码
    private final Integer code;
    // 自定义描述信息
    private final String message;

    // 遍历
    public static ReturnCodeEnum getReturnCodeEnum(Integer code) {
        return Arrays.stream(ReturnCodeEnum.values()).filter(result -> result.getCode().equals(code)).findFirst().orElse(null);
    }
}
