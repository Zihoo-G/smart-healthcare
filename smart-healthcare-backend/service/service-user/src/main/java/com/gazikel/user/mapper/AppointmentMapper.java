package com.gazikel.user.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gazikel.model.pojo.Appointment;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AppointmentMapper extends BaseMapper<Appointment> {
}
