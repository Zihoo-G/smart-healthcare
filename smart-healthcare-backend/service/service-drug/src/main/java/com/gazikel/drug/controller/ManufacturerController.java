package com.gazikel.drug.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.gazikel.common.result.Result;
import com.gazikel.drug.service.ManufacturerService;
import com.gazikel.model.pojo.Manufacturer;
import com.gazikel.model.vo.ManufacturerVo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.logging.log4j.message.ReusableMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "药物进销存模块", description = "供应商管理接口")
@RestController
@RequestMapping("/sys/drug/manufacturer")
@CrossOrigin
public class ManufacturerController {

    @Autowired
    private ManufacturerService manufacturerService;

    @Operation(description = "添加供应商")
    @PostMapping("add")
    public Result<String> addManufacturer(@RequestBody Manufacturer manufacturer) {
        manufacturerService.save(manufacturer);
        return Result.success("ok");
    }

    @Operation(description = "删除供应商")
    @DeleteMapping("delete/{id}")
    public Result<Boolean> deleteManufacturer(@PathVariable("id") Integer id) {
        return Result.success(manufacturerService.removeById(id));
    }

    @Operation(description = "批量删除供应商")
    @DeleteMapping("delete")
    public Result<Boolean> deleteManufacturers(@RequestBody List<Integer> ids) {
        return Result.success(manufacturerService.removeBatchByIds(ids));
    }

    @Operation(description = "修改供应商信息")
    @PostMapping("update")
    public Result<Boolean> updateManufacturer(@RequestBody Manufacturer manufacturer) {
        return Result.success(manufacturerService.updateById(manufacturer));
    }

    @Operation(description = "根据id获取供应商信息")
    @GetMapping("get/{id}")
    public Result<Manufacturer> getManufacturerById(@PathVariable("id") Integer id) {
        return Result.success(manufacturerService.getById(id));
    }

    @PostMapping("list/{pageNum}/{pageSize}")
    public Result<Page<Manufacturer>> getManufacturerByQuery(@PathVariable("pageNum") Integer pageNum,
                                                             @PathVariable("pageSize") Integer pageSize,
                                                             @RequestBody(required = false) ManufacturerVo manufacturerVo) {
        Page<Manufacturer> page= new Page<>(pageNum, pageSize);

        Page<Manufacturer> pageResult = manufacturerService.page(page, null);
        return Result.success(pageResult);
    }
}
