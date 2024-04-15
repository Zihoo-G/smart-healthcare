package com.gazikel.model.vo;

import com.baomidou.mybatisplus.annotation.TableField;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(title = "供应商查询实体类")
public class ManufacturerVo {

    @Schema(title = "药物名称")
    @TableField("name")
    private String name;
}
