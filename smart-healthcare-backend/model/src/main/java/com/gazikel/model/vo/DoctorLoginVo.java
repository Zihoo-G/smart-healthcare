package com.gazikel.model.vo;

import com.baomidou.mybatisplus.annotation.TableField;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorLoginVo {
    @Schema(title = "id")
    @TableField("id")
    private Long id;
    @Schema(title = "uid")
    @TableField("uid")
    private String uid;
    @Schema(title = "姓名")
    @TableField("name")
    private String name;

    @Schema(title = "头像")
    @TableField("url")
    private String avatar;

    @Schema(title = "密码")
    @TableField("password")
    private String password;
}
