package com.gazikel.hospital.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gazikel.hospital.mapper.CheckMapper;
import com.gazikel.hospital.service.CheckService;
import com.gazikel.model.pojo.Check;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CheckServiceImpl extends ServiceImpl<CheckMapper, Check> implements CheckService {

    @Autowired
    private CheckMapper checkMapper;
}
