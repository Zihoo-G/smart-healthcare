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
@Schema(description = "处方实体类")
@TableName("t_recipe")
public class Recipe extends BaseEntity {
    @TableField("uid")
    private Integer uid;
    @TableField("did")
    private Integer did;
    @TableField("number")
    private Integer number;

    @TableField("is_outbound")
    private Integer isOutBound;


    @TableField(exist = false)
    private float price;
    @TableField(exist = false)
    private String username;
    @TableField(exist = false)
    private String uname;
    @TableField(exist = false)
    private String dname;
}
