package com.example.team3backend.dto;

import com.example.team3backend.utility.LocalDateDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AvailableRoomRequestDto {
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

    private SortTypeDto sortType = null;
    private FilterTypeDto[] filterTypes = null;
}
