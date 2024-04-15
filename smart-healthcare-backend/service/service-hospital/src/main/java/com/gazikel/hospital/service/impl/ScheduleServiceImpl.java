package com.gazikel.hospital.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gazikel.hospital.mapper.DoctorMapper;
import com.gazikel.hospital.mapper.ScheduleMapper;
import com.gazikel.hospital.service.ScheduleService;
import com.gazikel.model.pojo.Doctor;
import com.gazikel.model.pojo.Schedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ScheduleServiceImpl extends ServiceImpl<ScheduleMapper, Schedule> implements ScheduleService {

    @Autowired
    private ScheduleMapper scheduleMapper;
    @Autowired
    private DoctorMapper doctorMapper;

    @Override
    public Map<String, List<Schedule>> getScheduleList(Integer days, Integer deptId) {
        // 获取当前日期
        LocalDate today = LocalDate.now();

        Map<String, List<Schedule>> map = new TreeMap<>();

        // 获取七天的日期
        for (int i = 0; i < days; ++i) {

            String now = today.plusDays(i).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            // 查询每一天排班信息
            QueryWrapper<Schedule> wrapper = new QueryWrapper<>();
            wrapper.eq("date", now);
            wrapper.eq("dept_id", deptId);
            List<Schedule> schedules = scheduleMapper.selectList(wrapper);
            for (Schedule schedule: schedules) {
                schedule.setDoctor(doctorMapper.selectById(schedule.getDid()));
            }
            map.put(now, schedules);
        }
        return map;


    }

    @Override
    public boolean addSchedule(Integer doctorId, Integer number, String date) throws ParseException {
        // 查询是否存在
        QueryWrapper<Schedule> wrapper = new QueryWrapper<>();
        wrapper.eq("did", doctorId);
        wrapper.eq("date", date);

        Schedule schedule = scheduleMapper.selectOne(wrapper);
        if (schedule != null) {
            schedule.setNumber(schedule.getNumber() + number);
            scheduleMapper.updateById(schedule);
        } else {
            Schedule insertSchedule = new Schedule();

            Doctor doctor = doctorMapper.selectById(doctorId);
            insertSchedule.setDid(doctorId);
            insertSchedule.setNumber(number);
            insertSchedule.setDate(new SimpleDateFormat("yyyy-MM-dd").parse(date));
            insertSchedule.setDeptId(doctor.getDeptId());
            scheduleMapper.insert(insertSchedule);
        }
        return true;
    }
}
