package com.gazikel.hospital.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.gazikel.common.result.Result;
import com.gazikel.hospital.service.ScheduleService;
import com.gazikel.model.pojo.Doctor;
import com.gazikel.model.pojo.Schedule;
import com.gazikel.model.request.AddSchedule;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/sys/hospital/doctor/schedule")
@CrossOrigin
@Tag(name = "医院管理接口", description = "医生排班接口设置")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @Operation(description = "查询几天内的排班信息")
    @GetMapping("list/{days}/{deptId}")
    public Result<Map<String, List<Schedule>>> getScheduleList(@PathVariable("days") Integer days, @PathVariable Integer deptId) {
        return Result.success(scheduleService.getScheduleList(days, deptId));
    }

    @Operation(description = "添加排班信息")
    @PostMapping("add")
    public Result addSchedule(@RequestBody AddSchedule formData) throws ParseException {
        System.out.println(formData);

        List<Integer> doctorIds = formData.getDoctorIds();
        Integer number = formData.getNumber();
        String date = formData.getDate();

        for (Integer doctorId: doctorIds) {
            scheduleService.addSchedule(doctorId, number, date);
        }
        return Result.success("ok");
    }
}
