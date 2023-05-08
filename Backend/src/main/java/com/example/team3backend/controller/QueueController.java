package com.example.team3backend.controller;

import com.example.team3backend.constants.Constants;
import com.example.team3backend.dto.QueueBookingRequestDto;
import com.example.team3backend.dto.QueueBookingResponse;
import com.example.team3backend.service.QueueService;
import com.example.team3backend.utility.BookingUtil;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QueueController {
    @Autowired
    QueueService queueService;
    @Autowired
    BookingUtil bookingUtil;
    @PostMapping(Constants.ControllerEndpointsConstants.PUSH_BOOKING)
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = Constants.ApiResponseConstants.PUSH_BOOKING_SUCCESS),
                    @ApiResponse(responseCode = "401", description = Constants.ApiResponseConstants.AUTH_ERROR),
                    @ApiResponse(responseCode = "403", description = Constants.ApiResponseConstants.PERMISSION_ERROR),
                    @ApiResponse(responseCode = "404", description = Constants.ApiResponseConstants.NOT_FOUND_ERROR),
                    @ApiResponse(responseCode = "500", description = Constants.ApiResponseConstants.SERVER_ERROR)
            }
    )
    public ResponseEntity<QueueBookingResponse> pushBookingToQueue(@RequestBody QueueBookingRequestDto queueBookingRequestDto){
        queueBookingRequestDto.setBooking_id(bookingUtil.generateRandomBookingId());
        return queueService.sendMessageToQueue(queueBookingRequestDto);
    }

}
