package com.gazikel.hospital.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.gazikel.model.pojo.Doctor;
import com.gazikel.model.pojo.Schedule;

import java.text.ParseException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface ScheduleService extends IService<Schedule> {
    Map<String, List<Schedule>> getScheduleList(Integer days, Integer deptId);

    boolean addSchedule(Integer doctorId, Integer number, String date) throws ParseException;
}
