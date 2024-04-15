package com.gazikel.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckDTO {

    private String symptom;
    private Integer age;
    private String sex;
    private Integer size;
}
