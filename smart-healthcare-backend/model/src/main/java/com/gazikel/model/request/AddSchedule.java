package com.gazikel.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddSchedule {

    private List<Integer> doctorIds;
    private Integer number;
    private String date;
}
