package com.gazikel.hospital.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.gazikel.common.result.Result;
import com.gazikel.hospital.service.CheckService;
import com.gazikel.model.pojo.Check;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/sys/hospital/check")
@CrossOrigin
public class CheckController {
    @Autowired
    private CheckService checkService;
    @Resource
    private RestTemplate restTemplate;
    @PostMapping("add")
    public Result<String> add(@RequestBody Check check) {
        Integer uid = check.getUid();
        String symptoms = check.getDescription();
        String[] symptomsList = symptoms.split(",");
        System.out.println(symptoms);
        System.out.println(symptomsList);
        for (String symptom: symptomsList) {
            Check newCheckInfo = new Check(uid, symptom);
            check.setCreateTime(new Date());
            check.setUpdateTime(new Date());
            checkService.save(newCheckInfo);
        }
        return Result.success("200");
    }

    @GetMapping("list/{id}")
    public Result<List<Check>> getChecksByPatientId(@PathVariable("id") Integer id) {
        QueryWrapper<Check> wrapper = new QueryWrapper<>();
        wrapper.eq("uid", id);

        List<Check> list = checkService.list(wrapper);
        return Result.success(list);
    }

    @GetMapping("symptom")
    public Result<List<String>> getSymptom(@RequestParam String query, @RequestParam Integer size) {
        String url = "http://localhost:4567/engine/completion?query={query}&size={size}";
        List<String> forObject = restTemplate.getForObject(url, List.class, query, size);
        System.out.println(forObject);
        return Result.success(forObject);
    }

    @GetMapping("disease/desc")
    public Result<Map<String, Object>> getDiseaseDesc(@RequestParam("disease") String disease) {
        String url = "http://localhost:4567/engine/disease?disease={disease}";
        String forObject = restTemplate.getForObject(url, String.class, disease);
        JSONObject json = JSON.parseObject(forObject);
        String desc = (String) json.get("desc");
        String cureLasttime = (String) json.get("cure_lasttime");
        List<String> commonDrug = (List<String>) json.get("common_drug");

        Map<String,Object> map = new HashMap<>();
        map.put("desc", desc);
        map.put("cureLasttime", cureLasttime);
        map.put("commonDrug", commonDrug);

        return Result.success(map);
    }
}
