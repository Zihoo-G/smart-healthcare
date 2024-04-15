package com.gazikel.hospital.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.gazikel.model.pojo.Recipe;
import com.gazikel.model.vo.RecipeVo;

import java.util.List;

public interface RecipeService extends IService<Recipe> {
    /**
     * 根据查询条件查询处方信息
     * @param pageNum
     * @param limitNum
     * @param recipeVo
     */
    List<Recipe> getRecipeListByQuery(Integer pageNum, Integer limitNum, RecipeVo recipeVo);
}
