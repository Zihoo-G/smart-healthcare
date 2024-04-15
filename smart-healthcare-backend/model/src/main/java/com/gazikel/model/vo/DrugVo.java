package com.gazikel.model.vo;

import com.baomidou.mybatisplus.annotation.TableField;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 用于条件查询字段封装
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(title = "药物查询实体类")
public class DrugVo {
    @Schema(title = "药物名称")
    @TableField("name")
    private String name;
}
