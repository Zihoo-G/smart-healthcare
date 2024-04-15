package com.gazikel.model.pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gazikel.model.base.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Schema(title = "医生实体类")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@TableName("t_doctor")
public class Doctor extends BaseEntity {

    @Schema(title = "医生工号")
    @TableField("uid")
    private String uid;
    @Schema(title = "医生姓名")
    @TableField("name")
    private String name;
    @Schema(title = "医生性别")
    @TableField("sex")
    private Integer sex;
    @Schema(title = "医生头像地址")
    @TableField("url")
    private String url;
    @Schema(title = "医生所在科室")
    @TableField("dept_id")
    private Integer deptId;
    @Schema(title = "医生级别")
    @TableField("type")
    private String type;
    @Schema(title = "医生描述")
    @TableField("description")
    private String description;

    @TableField(exist = false)
    private Department department;
}
