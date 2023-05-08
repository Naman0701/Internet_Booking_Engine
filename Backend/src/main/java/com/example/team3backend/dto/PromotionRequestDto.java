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
public class PromotionRequestDto {

    @NotNull
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private String startDate;

    @NotNull
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private String endDate;

    private String applicableDiscountType=null;

    private String roomType=null;

    private String promoCode=null;
}
