package com.example.team3backend.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RatingRequestDto {
    @NotNull
    private String bookingId;
    @NotNull
    private Integer rating;
    @NotNull
    private String review;
}
