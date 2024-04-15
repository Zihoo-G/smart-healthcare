package com.gazikel.model.vo;

import com.baomidou.mybatisplus.annotation.TableField;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorVo {

    @Schema(title = "医生姓名")
    @TableField("name")
    private String name;

    @Schema(title = "医生所在科室")
    @TableField("dept_id")
    private Integer deptId;
}
