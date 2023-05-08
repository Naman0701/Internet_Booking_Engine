package com.example.team3backend.controller;

import com.example.team3backend.constants.Constants;
import com.example.team3backend.dto.PriceBreakDownRequestDto;
import com.example.team3backend.service.PriceBreakDownService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Map;

@RestController
public class CheckoutController {
    @Autowired
    private PriceBreakDownService priceBreakDownService;

    @PostMapping(Constants.ControllerEndpointsConstants.PRICE_BREAK_DOWN)
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = Constants.ApiResponseConstants.PRICE_BREAK_DOWN_SUCCESS),
                    @ApiResponse(responseCode = "401", description = Constants.ApiResponseConstants.AUTH_ERROR),
                    @ApiResponse(responseCode = "403", description = Constants.ApiResponseConstants.PERMISSION_ERROR),
                    @ApiResponse(responseCode = "404", description = Constants.ApiResponseConstants.NOT_FOUND_ERROR),
                    @ApiResponse(responseCode = "500", description = Constants.ApiResponseConstants.SERVER_ERROR)
            }
    )
    public ResponseEntity<Map<LocalDate,Integer>> getPriceBreakDown(@RequestBody PriceBreakDownRequestDto priceBreakDownRequestBody){

        return priceBreakDownService.getPriceBreakDown(priceBreakDownRequestBody);
    }
}
