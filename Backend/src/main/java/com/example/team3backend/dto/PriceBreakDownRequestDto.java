package com.example.team3backend.dto;

import com.example.team3backend.utility.LocalDateDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@AllArgsConstructor
@Slf4j
public class PriceBreakDownRequestDto {

    @NotNull
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private String startDate;

    @NotNull
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private String endDate;

    @NotNull
    private Integer roomCount;

    @NotNull
    private Integer propertyId;

    @NotNull
    private String roomType;
}
