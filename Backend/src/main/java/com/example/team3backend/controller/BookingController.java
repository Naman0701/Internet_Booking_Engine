package com.example.team3backend.controller;

import com.example.team3backend.constants.Constants;
import com.example.team3backend.dto.BookingDetailsDto;
import com.example.team3backend.entity.BookingStatus;
import com.example.team3backend.service.BookingService;
import com.example.team3backend.service.BookingStatusService;
import com.example.team3backend.utility.BookingUtil;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(Constants.ControllerEndpointsConstants.BOOKINGS)

public class BookingController {

        @Autowired
        private BookingService bookingService;
        @Autowired
        private BookingStatusService bookingStatusService;
        @Autowired
        private BookingUtil bookingUtil;


        @PostMapping("/cancel/{bookingId}")
        public ResponseEntity<Object> cancelBooking(@PathVariable String bookingId) {
            ResponseEntity<String> cancellationResponse = bookingService.cancelBooking(bookingId);
            if (cancellationResponse.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.ok(Map.of("message", cancellationResponse.getBody()));
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", cancellationResponse.getBody()));
            }
        }

        @GetMapping("/booking-details/{bookingId}")
        @ApiResponses(
                value = {
                        @ApiResponse(responseCode = "200", description = Constants.ApiResponseConstants.BOOKING_DETAILS_SUCCESS),
                        @ApiResponse(responseCode = "401", description = Constants.ApiResponseConstants.AUTH_ERROR),
                        @ApiResponse(responseCode = "403", description = Constants.ApiResponseConstants.PERMISSION_ERROR),
                        @ApiResponse(responseCode = "404", description = Constants.ApiResponseConstants.NOT_FOUND_ERROR),
                        @ApiResponse(responseCode = "500", description = Constants.ApiResponseConstants.SERVER_ERROR)
                }
        )
        public ResponseEntity<Object> getBookingDetails(@PathVariable String bookingId) {
            BookingDetailsDto bookingDetails = bookingService.getBookingDetails(bookingId);
            if (bookingDetails == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(bookingDetails);
        }

        @GetMapping("/booking-status/{bookingId}")
        public ResponseEntity<Object> checkBookingStatus(@PathVariable String bookingId) {
            BookingStatus bookingStatus = bookingStatusService.getBookingStatus(bookingId);
            if (bookingStatus == null) {
                String message = "Booking status not found for Booking Id: " + bookingId;
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
            } else {
                return ResponseEntity.ok(bookingStatus);
            }
        }

        @GetMapping("/my-bookings/{userId}")
        @ApiResponses(
                value = {
                        @ApiResponse(responseCode = "200", description = Constants.ApiResponseConstants.BOOKING_DETAILS_SUCCESS),
                        @ApiResponse(responseCode = "401", description = Constants.ApiResponseConstants.AUTH_ERROR),
                        @ApiResponse(responseCode = "403", description = Constants.ApiResponseConstants.PERMISSION_ERROR),
                        @ApiResponse(responseCode = "404", description = Constants.ApiResponseConstants.NOT_FOUND_ERROR),
                        @ApiResponse(responseCode = "500", description = Constants.ApiResponseConstants.SERVER_ERROR)
                }
        )
        public ResponseEntity<List<BookingDetailsDto>> getBookingDetailsForUser(@PathVariable String userId) {
            List<BookingDetailsDto> bookingDetailsList = bookingService.getBookingDetailsForUser(userId);
            if (bookingDetailsList.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(bookingDetailsList);
        }


}
