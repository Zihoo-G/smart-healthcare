package com.gazikel.hospital.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gazikel.common.helper.JwtHelper;
import com.gazikel.common.utils.MD5;
import com.gazikel.hospital.mapper.DoctorMapper;
import com.gazikel.hospital.service.DoctorService;
import com.gazikel.model.pojo.Doctor;
import com.gazikel.model.vo.DoctorLoginVo;
import com.gazikel.model.vo.DoctorVo;
import com.gazikel.model.vo.PatientInfoVo;
import com.gazikel.model.vo.PatientQueryVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl extends ServiceImpl<DoctorMapper, Doctor> implements DoctorService {

    @Autowired
    private DoctorMapper doctorMapper;

    @Override
    public Map<String, Object> doctorLogin(DoctorLoginVo doctorVo) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        Map<String, Object> result = new HashMap<>();
        DoctorLoginVo doctor = doctorMapper.getDoctorPassword(doctorVo.getUid());

        if (doctor == null) {
            result.put("message", "账户或密码错误");
            return result;
        }
        String password = MD5.getEncryptedPwd(doctorVo.getPassword());
        if (!password.equals(doctor.getPassword())) {
            result.put("message", "账户或密码错误");
            return result;
        }

        String token = JwtHelper.createToken(doctor.getId(), doctor.getUid());
        result.put("tokenType", "Bearer");
        result.put("accessToken", token);

        doctor = doctorMapper.getDoctorLoginInfo(doctor.getId());
        doctor.setPassword("");
        result.put("user", doctor);
        return result;
    }

    @Override
    public DoctorLoginVo getDoctorInfo(Long id) {
        return doctorMapper.getDoctorLoginInfo(id);
    }

    /**
     * 获取某个医生的挂号患者信息
     * @param data
     * @return
     */
    @Override
    public List<PatientInfoVo> getPatientInfo(PatientQueryVo data) throws ParseException {

        // 判断日期是否为空
        if (data.getDate().isEmpty()) {
            // 如果为空则输入当前日期
            Date today = new Date();
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            data.setDate(dateFormat.format(today));
        }
        List<PatientInfoVo> patientInfo = doctorMapper.getPatientInfo(data.getId(), data.getDate(), data.getName());
        if (!patientInfo.isEmpty() && patientInfo.get(0) != null) {
            System.out.println(patientInfo);
            for (PatientInfoVo patient : patientInfo) {
                List<String> list = Arrays.stream(patient.getDescription().split(",")).collect(Collectors.toList());
                while (list.size() < 4) {
                    list.add("暂无");
                }
                patient.setDescriptions(list);
            }
        }
        return patientInfo;
    }


}
