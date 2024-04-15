package com.gazikel.user.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.gazikel.common.helper.JwtHelper;
import com.gazikel.common.result.Result;
import com.gazikel.common.utils.MD5;
import com.gazikel.hospital.service.ScheduleService;
import com.gazikel.model.pojo.Schedule;
import com.gazikel.model.pojo.User;
import com.gazikel.model.vo.UserInfoVo;
import com.gazikel.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin
@Tag(name = "用户操作接口", description = "用户登录操作")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private ScheduleService scheduleService;

    @PostMapping("register")
    @Operation(description = "注册")
    public Result<String> registerUser(@RequestBody User user) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        // 查询该用户名是否存在
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("username", user.getUsername());
        User isExists = userService.getOne(wrapper);
        if (isExists == null) {
            // 将密码进行MD5加密
            String password = user.getPassword();
            password = MD5.getEncryptedPwd(password);
            user.setPassword(password);
            // 将用户添加到数据库
            userService.save(user);

            return Result.success("成功注册，用户名：" + user.getUsername());
        }
        return Result.error(204, "用户名已存在");
    }

    @PostMapping("login")
    @Operation(description = "登录")
    public Result<Map<String, Object>> login(@RequestBody User user) throws UnsupportedEncodingException, NoSuchAlgorithmException {

        Map<String, Object> stringObjectMap = userService.loginUser(user);

        return Result.success(stringObjectMap);
    }

    @GetMapping("info")
    @Operation(description ="根据token获取用户信息")
    public Result<UserInfoVo> getUserInfo(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        token = token.split(" ")[1];

        Long userId = JwtHelper.getUserId(token);
        String username = JwtHelper.getUsername(token);
        return Result.success(new UserInfoVo(userId, username));
    }


}
