package com.example.team3backend.service;

import com.example.team3backend.dto.QueueBookingRequestDto;
import com.example.team3backend.dto.RoomAvailabilityTableDto;
import com.example.team3backend.entity.RoomTypeRoomId;
import com.example.team3backend.repository.IRoomTypeRoomIdRepository;
import com.example.team3backend.utility.DateDeserializer;
import com.example.team3backend.utility.QueueBookingRequestValidator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@Slf4j
public class RoomAvailabilityService {

    @Autowired
    RoomTypeAvailabilityTableService roomTypeAvailabilityTableService;

    @Autowired
    DateDeserializer dateDeserializer;
    @Autowired
    QueueBookingRequestValidator queueBookingRequestValidator;
    @Autowired
    IRoomTypeRoomIdRepository roomTypeRoomIdRepository;

    public boolean checkOverLappingDate(String queueBookingRequest,List<Integer>roomIdsAvailableForBooking) {


        ObjectMapper objectMapper = new ObjectMapper();
        try {
            QueueBookingRequestDto bookingRequestDto = objectMapper.readValue(queueBookingRequest, QueueBookingRequestDto.class);

            List<String> errors = queueBookingRequestValidator.validateQueueBookingRequest(bookingRequestDto);
            if (!errors.isEmpty()) {
                log.error(String.valueOf(errors));
                // Log or throw an exception with the errors and handle it appropriately
            } else {
                String roomType = bookingRequestDto.getRoom_type();
                LocalDate startDate = LocalDate.parse(bookingRequestDto.getCheck_in_date(), DateTimeFormatter.ISO_DATE_TIME);
                LocalDate endDate = LocalDate.parse(bookingRequestDto.getCheck_out_date(), DateTimeFormatter.ISO_DATE_TIME);
                Integer roomCount = Integer.valueOf(bookingRequestDto.getRoom_count());

                long numOfDays = ChronoUnit.DAYS.between(startDate, endDate);
                if (roomIdsAvailableForBooking.size() < roomCount) {
                    return false; // Rooms not available for booking
                }

                List<LocalDate> dates = new ArrayList<>();
                for (int i = 0; i <= numOfDays; i++) {
                    LocalDate date = startDate.plusDays(i);
                    dates.add(date);
                }

                Optional<RoomAvailabilityTableDto> roomAvailabilityTableResponse = roomTypeAvailabilityTableService.getRoomTypeDateRange(roomType);
                if (roomAvailabilityTableResponse.isPresent()) {
                    RoomAvailabilityTableDto roomAvailabilityTableDto = roomAvailabilityTableResponse.get();
                    String dateRangeString = roomAvailabilityTableDto.getDateRange();
                    List<LocalDate> dateList = dateDeserializer.getDateList(dateRangeString);
                    Set<LocalDate> dateSet = new HashSet<>(dateList);
                    boolean hasOverlap = dates.stream().anyMatch(dateSet::contains);
                    if (!hasOverlap) {
                        roomTypeAvailabilityTableService.addDateRangeToRoomType(queueBookingRequest);
                    }

                    return !hasOverlap;
                } else {
                    //will create a room type with the date range map if not present already in the table
                    roomTypeAvailabilityTableService.addDateRangeToRoomType(queueBookingRequest);
                    //room type is not present in room availability dynamodb table , it means it is available it can be booked
                    return true;
                }
            }

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return false;
    }

    private List<Integer> checkRoomAvailability(String roomType, String startDate, String endDate, long numOfDays) {
        List<Integer> rooms = roomTypeRoomIdRepository.findAvailableRoomIdsForDateRange(roomType, startDate, endDate, numOfDays);
        return rooms;
    }


    public List<Integer> isRoomCountAvailableForBooking(String queueBookingRequest) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            QueueBookingRequestDto bookingRequestDto = objectMapper.readValue(queueBookingRequest, QueueBookingRequestDto.class);
            List<String> errors = queueBookingRequestValidator.validateQueueBookingRequest(bookingRequestDto);
            if (!errors.isEmpty()) {
                log.error(String.valueOf(errors));
            } else {
                String roomType = bookingRequestDto.getRoom_type();
                LocalDate startDate = LocalDate.parse(bookingRequestDto.getCheck_in_date(), DateTimeFormatter.ISO_DATE_TIME);
                LocalDate endDate = LocalDate.parse(bookingRequestDto.getCheck_out_date(), DateTimeFormatter.ISO_DATE_TIME);
                long numOfDays = ChronoUnit.DAYS.between(startDate, endDate);
                List<Integer> roomsAvailable = checkRoomAvailability(roomType, bookingRequestDto.getCheck_in_date(), bookingRequestDto.getCheck_out_date(), numOfDays);
                return roomsAvailable;
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);

        }
        return null;
    }
}





