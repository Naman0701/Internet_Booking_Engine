package com.example.team3backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SortTypeDto {

    private String name;
    private String attribute;
    private String order;
}
