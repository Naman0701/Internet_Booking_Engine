package com.example.team3backend.exception;

import com.example.team3backend.dto.ErrorResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDto> handleException(Exception e)
    {
        ErrorResponseDto errorResponseDto=new ErrorResponseDto(500,e.getMessage());
        return new ResponseEntity<ErrorResponseDto> (errorResponseDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}