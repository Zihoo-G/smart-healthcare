package com.gazikel.hospital.controller;

import com.gazikel.common.result.Result;
import com.gazikel.hospital.service.RecipeService;
import com.gazikel.model.pojo.Recipe;
import com.gazikel.model.vo.RecipeVo;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/sys/hospital/recipe")
@CrossOrigin
public class RecipeController {
    @Autowired
    private RecipeService recipeSerive;

    @PostMapping("batch/add")
    public Result<Boolean> batchAddRecipe(@RequestBody List<Recipe> data) {
        for (Recipe recipe: data) {
            recipe.setCreateTime(new Date());
            recipe.setUpdateTime(new Date());
            recipe.setIsOutBound(0);
        }
        boolean b = recipeSerive.saveBatch(data);
        return Result.success(b);
    }

    @Operation(description = "分页展示医生开具的处方药品信息")
    @GetMapping("list/recipe/{pageNum}/{limitNum}")
    public Result<List<Recipe>> getRecipeByQuery(@PathVariable("pageNum") Integer pageNum, @PathVariable("limitNum") Integer limitNum, @RequestBody(required = false) RecipeVo recipeVo) {

        List<Recipe> recipeListByQuery = recipeSerive.getRecipeListByQuery(pageNum, limitNum, recipeVo);

        return Result.success(recipeListByQuery);
    }

    @Operation(description = "对处方中所包含的药品进行出库")
    @PostMapping("outbound")
    public Result<String> outBoundDrug(@RequestBody List<Integer> recipeIds) {
        System.out.println(recipeIds);
        // 药品数量减少接口

        // 订单状态出库接口
        List<Recipe> recipes = recipeSerive.listByIds(recipeIds);
        for (Recipe recipe: recipes) {
            recipe.setIsOutBound(1);
        }
        boolean b = recipeSerive.updateBatchById(recipes);
        return Result.success("成功更新");
    }
}
