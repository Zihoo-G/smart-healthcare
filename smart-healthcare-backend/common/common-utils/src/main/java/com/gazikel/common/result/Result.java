package com.gazikel.common.result;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class Result<T> {

    private Integer code;
    private String message;
    private T data;
    private Long timestamp;

    public Result() {
        this.timestamp = System.currentTimeMillis();
    }

    public static <T> Result<T> success(T data) {
        Result resultData = new Result<>();

        resultData.setCode(ReturnCodeEnum.SUCCESS.getCode());
        resultData.setMessage(ReturnCodeEnum.SUCCESS.getMessage());
        resultData.setData(data);

        return resultData;
    }

    public static <T> Result<T> success(Integer code, String message) {
        Result resultData = new Result<>();

        resultData.setCode(code);
        resultData.setMessage(message);

        return resultData;
    }

    public static <T> Result<T> error(Integer code, String msg) {
        Result resultData = new Result<>();
        resultData.setCode(code);
        resultData.setMessage(msg);
        resultData.setData(msg);
        return resultData;
    }
}
