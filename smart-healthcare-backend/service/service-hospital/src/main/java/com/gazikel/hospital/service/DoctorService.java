package com.gazikel.hospital.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.gazikel.model.pojo.Doctor;
import com.gazikel.model.vo.DoctorLoginVo;
import com.gazikel.model.vo.DoctorVo;
import com.gazikel.model.vo.PatientInfoVo;
import com.gazikel.model.vo.PatientQueryVo;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface DoctorService extends IService<Doctor> {

    Map<String, Object> doctorLogin(DoctorLoginVo doctorVo) throws UnsupportedEncodingException, NoSuchAlgorithmException;

    DoctorLoginVo getDoctorInfo(Long id);

    List<PatientInfoVo> getPatientInfo(PatientQueryVo data) throws ParseException;
}
