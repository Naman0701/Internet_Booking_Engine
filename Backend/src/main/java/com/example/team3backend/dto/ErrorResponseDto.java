package com.example.team3backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponseDto {
    private Integer errorCode;
    private String errorMessage;
}
