package com.gazikel.hospital.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gazikel.model.pojo.Recipe;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

@Mapper
public interface RecipeMapper extends BaseMapper<Recipe> {
    List<Recipe> getRecipeList(@Param("pageNum") Integer pageNum, @Param("limitNum") Integer limitNum, @Param("id") Long id, @Param("name") String name, @Param("date") Date date);
}
