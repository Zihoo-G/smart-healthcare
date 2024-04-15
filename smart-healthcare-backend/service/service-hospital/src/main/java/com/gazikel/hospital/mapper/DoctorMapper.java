package com.gazikel.hospital.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gazikel.model.pojo.Doctor;
import com.gazikel.model.vo.DoctorLoginVo;
import com.gazikel.model.vo.DoctorVo;
import com.gazikel.model.vo.PatientInfoVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import javax.print.Doc;
import java.util.List;

@Mapper
public interface DoctorMapper extends BaseMapper<Doctor> {

    // 查询排班的医生
    public List<Doctor> getScheduleDoctors(@Param("day") String day, @Param("dept_id") Integer dept_id);


    DoctorLoginVo getDoctorPassword(@Param("uid") String uid);

    DoctorLoginVo getDoctorLoginInfo(@Param("id") Long id);

    List<PatientInfoVo> getPatientInfo(@Param("id") Integer id, @Param("date") String date, @Param("name") String name);
}
