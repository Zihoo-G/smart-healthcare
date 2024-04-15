package com.gazikel.hospital.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gazikel.hospital.mapper.RecipeMapper;
import com.gazikel.hospital.service.RecipeService;
import com.gazikel.model.pojo.Recipe;
import com.gazikel.model.vo.RecipeVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class RecipeServiceImpl extends ServiceImpl<RecipeMapper, Recipe> implements RecipeService {
    @Autowired
    private RecipeMapper recipeMapper;
    /**
     * 根据查询条件查询处方信息
     * @param pageNum
     * @param limitNum
     * @param recipeVo
     */
    @Override
    public List<Recipe> getRecipeListByQuery(Integer pageNum, Integer limitNum, RecipeVo recipeVo) {
        String name;
        Date date;
        Long id;
        if (recipeVo == null) {
            name = null;
            date = null;
            id = null;
        } else {
            name = recipeVo.getName();
            date = recipeVo.getDate();
            id = recipeVo.getId();
        }
        List<Recipe> recipeList = recipeMapper.getRecipeList(pageNum, limitNum,id, name, date);
        for (Recipe recipe: recipeList) {
            recipe.setPrice(recipe.getPrice() * recipe.getNumber());
        }
        return recipeList;
    }
}
