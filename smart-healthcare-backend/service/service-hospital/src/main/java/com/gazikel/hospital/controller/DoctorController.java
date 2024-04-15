package com.gazikel.hospital.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.gazikel.common.helper.JwtHelper;
import com.gazikel.common.result.Result;
import com.gazikel.hospital.service.DepartmentService;
import com.gazikel.hospital.service.DoctorService;
import com.gazikel.hospital.service.FileService;
import com.gazikel.model.pojo.Doctor;
import com.gazikel.model.pojo.User;
import com.gazikel.model.vo.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.print.Doc;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Tag(name = "医院管理接口", description = "医生管理接口设置")
@RestController
@RequestMapping("/sys/hospital/doctor")
@CrossOrigin
public class DoctorController {

    @Autowired
    private DoctorService doctorService;
    @Autowired
    private DepartmentService departmentService;
    @Autowired
    private FileService fileService;

    @Operation(description = "增加一个医生信息")
    @PostMapping("add")
    public Result<Boolean> addDoctor(@RequestBody Doctor doctor) {
        boolean save = doctorService.save(doctor);
        return Result.success(save);
    }

    @Operation(description = "修改医生信息")
    @PostMapping("update")
    public Result<Boolean> updateDoctor(@RequestBody Doctor doctor) {
        boolean b = doctorService.updateById(doctor);
        return Result.success(b);
    }

    @Operation(description = "删除医生信息")
    @DeleteMapping("delete/{id}")
    public Result<Boolean> deleteDoctorById(@PathVariable("id") Integer id) {
        return Result.success(doctorService.removeById(id));
    }

    @Operation(description = "批量删除医生信息")
    @DeleteMapping("delete")
    public Result<Boolean> deleteDoctorBatchs(@RequestBody List<Integer> ids) {
        return Result.success(doctorService.removeBatchByIds(ids));
    }

    @Operation(description = "分页显示医生信息")
    @PostMapping("list/{pageNum}/{pageSize}")
    public Result<Page<Doctor>> getDoctorsByQuery(@PathVariable("pageNum") Integer pageNum, @PathVariable("pageSize") Integer pageSize, @RequestBody DoctorVo doctorVo) {
        Page<Doctor> page = new Page<>(pageNum, pageSize);


        Page<Doctor> pageResult = doctorService.page(page, null);
        pageResult.getRecords().forEach(x -> x.setDepartment(departmentService.getById(x.getDeptId())));
        return Result.success(pageResult);
    }

    @Operation(description = "根据id获取医生信息")
    @GetMapping("get/{id}")
    public Result<Doctor> getDoctorById(@PathVariable("id") Integer id) {
        return Result.success(doctorService.getById(id));
    }

    @Operation(description = "根据部门获取医生信息")
    @GetMapping("get/dept/{id}")
    public Result<List<Doctor>> getDoctorByDept(@PathVariable("id") Integer id) {
        QueryWrapper<Doctor> wrapper = new QueryWrapper<>();

        wrapper.eq("dept_id", id);
        List<Doctor> list = doctorService.list(wrapper);
        return Result.success(list);
    }



    @Operation(description = "上传医生头像接口")
    @PostMapping("avatar")
    public Result<String> uploadAvatar( MultipartFile file) {
        System.out.println("进入");
        return Result.success(fileService.uploadAvatar(file));
    }

    @Operation(description = "根据医生id找到今日就诊患者数据")
    @PostMapping("patient/info")
    public Result<List<PatientInfoVo>> getUserInfoByDoctorId(@RequestBody PatientQueryVo data) throws ParseException {
        List<PatientInfoVo> patientInfo = doctorService.getPatientInfo(data);


        return Result.success(patientInfo);
    }

    @Operation(description = "医生登录接口")
    @PostMapping("login")
    public Result<Map<String, Object>> login(@RequestBody DoctorLoginVo doctorVo) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        System.out.println(doctorVo);
        Map<String, Object> result = doctorService.doctorLogin(doctorVo);
        return Result.success(result);
    }

    @Operation(description = "根据token获取用户信息")
    @GetMapping("info")
    public Result<DoctorLoginVo> getDoctorInfo(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        token = token.split(" ")[1];

        Long userId = JwtHelper.getUserId(token);
        DoctorLoginVo doctor = doctorService.getDoctorInfo(userId);

        System.out.println("获取用户信息" + doctor);
        return Result.success(doctor);
    }




}
