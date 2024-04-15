package com.gazikel.user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.gazikel.model.pojo.User;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

public interface UserService extends IService<User> {
    Map<String, Object> loginUser(User user) throws UnsupportedEncodingException, NoSuchAlgorithmException;
}
