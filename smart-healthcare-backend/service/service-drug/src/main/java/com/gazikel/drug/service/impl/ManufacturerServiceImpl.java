package com.gazikel.drug.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gazikel.drug.mapper.ManufacturerMapper;
import com.gazikel.drug.service.ManufacturerService;
import com.gazikel.model.pojo.Manufacturer;
import org.springframework.stereotype.Service;

@Service
public class ManufacturerServiceImpl extends ServiceImpl<ManufacturerMapper, Manufacturer> implements ManufacturerService {
}
