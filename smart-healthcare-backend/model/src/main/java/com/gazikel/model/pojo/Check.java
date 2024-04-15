package com.gazikel.model.pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gazikel.model.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("t_check")
public class Check extends BaseEntity {
    @TableField("uid")
    private Integer uid;
    @TableField("description")
    private String description;
}
