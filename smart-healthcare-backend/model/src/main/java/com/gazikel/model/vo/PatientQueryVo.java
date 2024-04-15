package com.gazikel.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientQueryVo {
    private Integer id;
    private String date;
    private String name;
}
