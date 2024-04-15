package com.gazikel.drug.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.gazikel.common.result.Result;
import com.gazikel.drug.service.DrugService;
import com.gazikel.model.pojo.Drug;
import com.gazikel.model.pojo.Recipe;
import com.gazikel.model.vo.DrugVo;
import com.gazikel.model.vo.RecipeVo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Tag(name = "药物进销存模块", description = "药物接口")
@RestController
@RequestMapping("/sys/drug")
@CrossOrigin
public class DrugController {

    @Autowired
    private DrugService drugService;

    @Operation(description = "分页展示筛选条件后的药品数据")
    @PostMapping("list/{pageNum}/{limitNum}")
    public Result<Page<Drug>> getDrugsByQuery(@PathVariable("pageNum") Integer pageNum, @PathVariable("limitNum") Integer limitNum, @RequestBody(required = false) DrugVo drugVo) {
        Page<Drug> page = new Page<>(pageNum, limitNum, true);

        // 构造条件
        QueryWrapper<Drug> wrapper = new QueryWrapper<>();
        wrapper.like("name", drugVo.getName());

        Page<Drug> pageDrugResult = drugService.page(page, wrapper);

        return Result.success(pageDrugResult);
    }

    @GetMapping("list/name")
    public Result<List<Drug>> getDrugByName(@RequestParam("name") String name) {
        QueryWrapper<Drug> wrapper = new QueryWrapper<>();
        wrapper.eq("name", name);
        List<Drug> list = drugService.list(wrapper);
        return Result.success(list);
    }





}
