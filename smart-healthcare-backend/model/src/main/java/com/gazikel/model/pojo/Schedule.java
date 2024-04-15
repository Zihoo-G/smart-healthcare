package com.gazikel.model.pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gazikel.model.base.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;

@Schema(title = "排班实体类")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@TableName("t_schedule")
public class Schedule extends BaseEntity {
    @Schema(title = "医生id")
    @TableField("did")
    private Integer did;

    @Schema(title = "部门id")
    @TableField("dept_id")
    private Integer deptId;

    @Schema(title = "排班时间")
    @TableField("date")
    private Date date;

    @Schema(title = "")
    @TableField("number")
    private Integer number;

    @Schema(title = "医生信息")
    @TableField(exist = false)
    private Doctor doctor;
}
