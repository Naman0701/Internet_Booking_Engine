package com.example.team3backend.controller;

import com.example.team3backend.constants.Constants;
import com.example.team3backend.dto.AvailableRoomRequestDto;
import com.example.team3backend.dto.AvailableRoomResponseDto;
import com.example.team3backend.dto.PromotionRequestDto;
import com.example.team3backend.dto.PromotionsResponseDto;
import com.example.team3backend.service.CustomPromotionsService;
import com.example.team3backend.service.DefaultPromotionsService;
import com.example.team3backend.service.SearchResultsService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@Slf4j
public class SearchResultsController {

    @Autowired
    private SearchResultsService searchResultsService;
    @Autowired
    private DefaultPromotionsService defaultPromotionsService;
    @Autowired
    private CustomPromotionsService customPromotionsService;

    @PostMapping(Constants.ControllerEndpointsConstants.SEARCH_RESULT)
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = Constants.ApiResponseConstants.SEARCH_RESULT_SUCCESS),
                    @ApiResponse(responseCode = "401", description = Constants.ApiResponseConstants.AUTH_ERROR),
                    @ApiResponse(responseCode = "403", description = Constants.ApiResponseConstants.PERMISSION_ERROR),
                    @ApiResponse(responseCode = "404", description = Constants.ApiResponseConstants.NOT_FOUND_ERROR),
                    @ApiResponse(responseCode = "500", description = Constants.ApiResponseConstants.SERVER_ERROR)
            }
    )
    public ResponseEntity<Set<AvailableRoomResponseDto>> getSearchResult(@RequestBody AvailableRoomRequestDto availableRoomRequestBody){
        return searchResultsService.getSearchResults(availableRoomRequestBody);
    }
    @PostMapping(Constants.ControllerEndpointsConstants.DEFAULT_PROMOTION)
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = Constants.ApiResponseConstants.DEFAULT_PROMOTION_SUCCESS),
                    @ApiResponse(responseCode = "401", description = Constants.ApiResponseConstants.AUTH_ERROR),
                    @ApiResponse(responseCode = "403", description = Constants.ApiResponseConstants.PERMISSION_ERROR),
                    @ApiResponse(responseCode = "404", description = Constants.ApiResponseConstants.NOT_FOUND_ERROR),
                    @ApiResponse(responseCode = "500", description = Constants.ApiResponseConstants.SERVER_ERROR)
            }
    )
    public ResponseEntity<Set<PromotionsResponseDto>> getDefaultPromotions(@RequestBody PromotionRequestDto promotionRequestBody){

        return defaultPromotionsService.getDefaultPromotions(promotionRequestBody);
    }

    @PostMapping(Constants.ControllerEndpointsConstants.CUSTOM_PROMOTION)
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = Constants.ApiResponseConstants.CUSTOM_PROMOTION_SUCCESS),
                    @ApiResponse(responseCode = "401", description = Constants.ApiResponseConstants.AUTH_ERROR),
                    @ApiResponse(responseCode = "403", description = Constants.ApiResponseConstants.PERMISSION_ERROR),
                    @ApiResponse(responseCode = "404", description = Constants.ApiResponseConstants.NOT_FOUND_ERROR),
                    @ApiResponse(responseCode = "500", description = Constants.ApiResponseConstants.SERVER_ERROR)
            }
    )
    public ResponseEntity<PromotionsResponseDto> getCustomPromotion(@RequestBody PromotionRequestDto promotionRequestBody) {

        return customPromotionsService.getCustomPromotion(promotionRequestBody);
    }
}
