package com.gazikel.user.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.gazikel.common.result.Result;
import com.gazikel.model.dto.CheckDTO;
import com.gazikel.model.pojo.CheckRecommendation;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user/qa")
@CrossOrigin
public class QAController {
    @Resource
    private RestTemplate restTemplate;

    @GetMapping("recommendation")
    public Result<List<Map<String, String>>> getDepartmentRecommendation(@RequestParam String symptom, @RequestParam String sex, @RequestParam Integer age, @RequestParam Integer size) {
        List<Map<String, String>> result = new ArrayList<>();
        String url = "http://localhost:4567/engine/diagnosis?symptom={symptom}&sex={sex}&age={age}&size={size}";
        String forObject = restTemplate.getForObject(url, String.class, symptom, sex, age, size);
        JSONArray objects = JSON.parseArray(forObject);
        for (int i = 0; i < objects.size(); ++i) {
            Map<String, String> map = new HashMap<>();
            JSONObject jsonObject = objects.getJSONObject(i);

            String diseaseName = (String) jsonObject.get("疾病名");
            List<String> departments = (List<String>) jsonObject.get("所属科室");
            String department = departments.get(departments.size() - 1);
            map.put("name", diseaseName);
            map.put("department", department);

            result.add(map);
        }
        return Result.success(result);
    }
}
