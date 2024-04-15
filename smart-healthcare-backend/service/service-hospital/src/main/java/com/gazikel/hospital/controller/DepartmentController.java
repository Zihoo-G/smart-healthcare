package com.gazikel.hospital.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.gazikel.common.result.Result;
import com.gazikel.hospital.service.DepartmentService;
import com.gazikel.model.pojo.Department;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sys/hospital/department")
@CrossOrigin
@Tag(name = "医院管理接口", description = "部门管理接口设置")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @RequestMapping("tree")
    @Operation(description = "树级部门")
    public Result<List<Department>> getDepartmentTree() {
        QueryWrapper<Department> wrapper = new QueryWrapper<>();
        wrapper.eq("parent_id", 0);
        // 查询出所有一级菜单
        List<Department> departmentList = departmentService.list(wrapper);
        for (Department department: departmentList) {

            Long id = department.getId();
            QueryWrapper<Department> departmentQueryWrapper = new QueryWrapper<>();
            departmentQueryWrapper.eq("parent_id", id);
            List<Department> list = departmentService.list(departmentQueryWrapper);
            department.setChildren(list);
        }
        return Result.success(departmentList);
    }

    @GetMapping("info/{id}")
    @Operation(description = "部门详细信息")
    public Result<Department> getDepartmentInfo(@PathVariable("id") Integer id) {
        Department department = departmentService.getById(id);
        return Result.success(department);
    }
}
