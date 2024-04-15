package com.gazikel.drug.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gazikel.drug.mapper.DrugMapper;
import com.gazikel.drug.service.DrugService;
import com.gazikel.model.pojo.Drug;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DrugServiceImpl extends ServiceImpl<DrugMapper, Drug> implements DrugService {
    @Autowired
    private DrugMapper drugMapper;
}
