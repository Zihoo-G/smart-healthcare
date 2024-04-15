package com.gazikel.model.base;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseEntity implements Serializable {

    @Schema(title = "id")
    @TableId(type = IdType.AUTO)
    private Long id;

    @Schema(title = "创建时间")
    @TableField("create_time")
    private Date createTime;

    @Schema(title = "更新时间")
    @TableField("update_time")
    private Date updateTime;

    @Schema(title = "逻辑删除")
    @TableField("is_deleted")
    @TableLogic
    private int isDeleted;

    @Schema(title = "其它参数")
    @TableField(exist = false)
    private Map<String, Object> params;
}
