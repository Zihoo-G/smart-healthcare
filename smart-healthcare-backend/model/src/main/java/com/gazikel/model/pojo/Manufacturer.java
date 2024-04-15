package com.gazikel.model.pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gazikel.model.base.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Schema(title = "药品生产厂家实体类")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@TableName("t_manufacturer")
public class Manufacturer extends BaseEntity {
    @Schema(title = "生产厂家名称")
    @TableField("name")
    private String name;
    @Schema(title = "地址")
    @TableField("address")
    private String address;
    @Schema(title = "批准日期")
    @TableField("approval")
    private String approval;
}
