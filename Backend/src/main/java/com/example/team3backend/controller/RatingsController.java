package com.example.team3backend.controller;

import com.example.team3backend.constants.Constants;
import com.example.team3backend.dto.RatingRequestDto;
import com.example.team3backend.dto.RatingResponseDto;
import com.example.team3backend.service.RatingService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class RatingsController {
    @Autowired
    public RatingService ratingService;

    @PostMapping(Constants.ControllerEndpointsConstants.RATING)
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = Constants.ApiResponseConstants.RATING_SUCCESS),
                    @ApiResponse(responseCode = "401", description = Constants.ApiResponseConstants.AUTH_ERROR),
                    @ApiResponse(responseCode = "403", description = Constants.ApiResponseConstants.PERMISSION_ERROR),
                    @ApiResponse(responseCode = "404", description = Constants.ApiResponseConstants.NOT_FOUND_ERROR),
                    @ApiResponse(responseCode = "500", description = Constants.ApiResponseConstants.SERVER_ERROR)
            }
    )
    public ResponseEntity<RatingResponseDto> getMinimumRateForDate(@RequestBody RatingRequestDto ratingRequest) {
        return ratingService.submitRating(ratingRequest);
    }
}
