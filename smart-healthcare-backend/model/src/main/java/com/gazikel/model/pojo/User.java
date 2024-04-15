package com.gazikel.model.pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.gazikel.model.base.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@TableName("t_user")
@Schema(title = "用户实体类")
public class User extends BaseEntity {
    @Schema(description = "用户名")
    @TableField("username")
    private String username;
    @Schema(description = "姓名")
    @TableField("name")
    private String name;

    @Schema(description = "身份证号")
    @TableField("identify")
    private String identify;

    @Schema(description = "密码")
    @TableField("password")
    private String password;
}
