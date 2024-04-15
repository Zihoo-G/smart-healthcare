package com.gazikel.model.pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gazikel.model.base.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@TableName("t_drug")
@Schema(title = "药物实体类")
public class Drug extends BaseEntity {

    @Schema(title = "药物名称")
    @TableField("name")
    private String name;

    @Schema(title = "药品类型信息")
    @TableField("type")
    private String type;

    @Schema(title = "药品描述信息")
    @TableField("description")
    private String description;

    @Schema(title = "药品规格信息")
    @TableField("specifications")
    private String specifications;

    @Schema(title = "生产厂家 外键")
    @TableField("manufacturer")
    private Integer manufacturer;

    @Schema(title = "批准文号")
    @TableField("license")
    private String license;

    @Schema(title = "剂型")
    @TableField("dosage")
    private String dosage;

    @Schema(title = "药品本位码")
    @TableField("standard_code")
    private String standardCode;




}
