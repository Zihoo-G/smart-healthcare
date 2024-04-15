package com.gazikel.user.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gazikel.model.pojo.Appointment;
import com.gazikel.user.mapper.AppointmentMapper;
import com.gazikel.user.service.AppointmentSerive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentServiceImpl extends ServiceImpl<AppointmentMapper, Appointment> implements AppointmentSerive {

    @Autowired
    private AppointmentMapper appointmentMapper;
}
