package com.gazikel.hospital.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gazikel.model.pojo.Department;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DepartmentMapper extends BaseMapper<Department> {
}
