package com.gazikel.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientInfoVo {

    private Long uid;

    private Integer number;

    private String username;
    private String date;
    private String name;
    private String identify;

    private String description;

    private List<String> descriptions;
}
