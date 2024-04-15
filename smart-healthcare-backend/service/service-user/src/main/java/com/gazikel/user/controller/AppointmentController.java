package com.gazikel.user.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.gazikel.common.result.Result;
import com.gazikel.hospital.service.ScheduleService;
import com.gazikel.model.pojo.Appointment;
import com.gazikel.model.pojo.Schedule;
import com.gazikel.user.service.AppointmentSerive;
import com.gazikel.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/user")
@CrossOrigin
@Tag(name = "用户操作接口", description = "用户预约操作")
public class AppointmentController {

    @Autowired
    private ScheduleService scheduleService;
    @Autowired
    private AppointmentSerive appointmentSerive;

    @GetMapping("appointment/{scheduleId}/{userId}")
    @Operation(description = "用户预约挂号操作")
    public Result<String> appointment(@PathVariable("scheduleId") Integer scheduleId, @PathVariable("userId") Integer userId) {
        // 查看该排班中预约是否有剩余
        Schedule schedule = scheduleService.getById(scheduleId);
        if (schedule.getNumber() <= 0) {
            return Result.error(200, "该医生已无剩余号");
        }
        // 查看该用户是否已经存在进入预定
        QueryWrapper<Appointment> wrapper = new QueryWrapper<>();
        wrapper.eq("date", schedule.getDate());
        wrapper.eq("uid", userId);
        if (appointmentSerive.exists(wrapper)) {
            return Result.error(200, "当日已经存在预约");
        }

        // 更改号源数量 - 1
        schedule.setNumber(schedule.getNumber() - 1);
        scheduleService.updateById(schedule);
        // 将信息插入新的 did - user - date 表中
        Appointment appointment = new Appointment(schedule.getDid(), userId, schedule.getDate(), 1);
        appointment.setIsDeleted(0);
        appointment.setCreateTime(new Date());
        appointment.setUpdateTime(new Date());
        appointmentSerive.save(appointment);
        return Result.success("成功预约");
    }
}
