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

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Schema(title = "预约实体表")
@TableName("t_appointment")
public class Appointment extends BaseEntity {
    @Schema(title = "医生id")
    @TableField("did")
    private Integer did;
    @Schema(title = "用户id")
    @TableField("uid")
    private Integer uid;
    @Schema(title = "预约日期")
    @TableField("date")
    private Date date;

    @Schema(title = "诊断次数")
    @TableField("number")
    private Integer number;
}
