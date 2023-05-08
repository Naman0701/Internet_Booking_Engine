package com.example.team3backend.controller;


import com.example.team3backend.constants.Constants;
import com.example.team3backend.service.RoomTypeAvailabilityTableService;
import com.example.team3backend.service.QueueService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {


    @Autowired
    private QueueService queueService;
    @Autowired
    private RoomTypeAvailabilityTableService roomTypeAvailabilityTableService;



    @GetMapping(Constants.ControllerEndpointsConstants.TEST)
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = Constants.ApiResponseConstants.MINIMUM_NIGHTLY_RATE_SUCCESS),
                    @ApiResponse(responseCode = "401", description = Constants.ApiResponseConstants.AUTH_ERROR),
                    @ApiResponse(responseCode = "403", description = Constants.ApiResponseConstants.PERMISSION_ERROR),
                    @ApiResponse(responseCode = "404", description = Constants.ApiResponseConstants.NOT_FOUND_ERROR),
                    @ApiResponse(responseCode = "500", description = Constants.ApiResponseConstants.SERVER_ERROR)
            }
    )
    public void test() {

        //roomTypeAvailabilityTableService.getRoomTypeDateRange("STANDARD_SUITE");
        //queueService.sendMessageToQueue("hi messages from backend");
    }
}
