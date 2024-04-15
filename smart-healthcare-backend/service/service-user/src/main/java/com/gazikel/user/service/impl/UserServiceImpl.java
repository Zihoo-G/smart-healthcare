package com.gazikel.user.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gazikel.common.helper.JwtHelper;
import com.gazikel.common.result.Result;
import com.gazikel.common.utils.MD5;
import com.gazikel.model.pojo.User;
import com.gazikel.user.mapper.UserMapper;
import com.gazikel.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public Map<String, Object> loginUser(User user) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        Map<String, Object> result = new HashMap<>();
        String username = user.getUsername();
        String password = user.getPassword();
        // 通过用户名进行查询
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("username", username);
        User userFromUsername = userMapper.selectOne(wrapper);
        if (userFromUsername == null) {
            result.put("code", 204);
            result.put("msg", "账号或密码错误");
            return result;
        }
        // 将密码进行md5加密
        password = MD5.getEncryptedPwd(password);
        // 比对密码
        if (!userFromUsername.getPassword().equals(password)) {
            result.put("code", 204);
            result.put("msg", "密码错误");
            return result;
        }
        // 返回登录用户名
        result.put("username", username);

        // 返回token信息
        // jwt生成token字符串
        String token = JwtHelper.createToken(userFromUsername.getId(), userFromUsername.getUsername());
        result.put("tokenType", "Bearer");
        result.put("accessToken", token);
        return result;
    }
}
