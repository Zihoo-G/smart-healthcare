package com.gazikel.model.pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gazikel.model.base.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Schema(title = "科室实体类")
@TableName("t_department")
public class Department extends BaseEntity {

    @Schema(title = "父级id")
    @TableField("parent_id")
    private Integer parentId;
    @Schema(title = "科室名称")
    @TableField("name")
    private String name;
    @Schema(title = "描述信息")
    @TableField("description")
    private String description;
    @Schema(title = "下属科室")
    @TableField(exist = false)
    private List<Department> children;
}
