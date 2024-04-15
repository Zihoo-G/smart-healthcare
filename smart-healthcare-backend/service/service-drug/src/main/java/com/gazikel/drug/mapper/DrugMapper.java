package com.gazikel.drug.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gazikel.model.pojo.Drug;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DrugMapper extends BaseMapper<Drug> {
}
