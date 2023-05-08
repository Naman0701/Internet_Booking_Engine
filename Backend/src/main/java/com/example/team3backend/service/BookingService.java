package com.example.team3backend.service;

import com.example.team3backend.dto.BookingDetailsDto;
import com.example.team3backend.dto.QueueBookingRequestDto;
import com.example.team3backend.entity.BookingDetails;
import com.example.team3backend.repository.IBookingDetailsRepository;
import com.example.team3backend.repository.IRoomTypeRoomIdRepository;
import com.example.team3backend.utility.BookingUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Slf4j
public class BookingService {


        @Autowired
        private IBookingDetailsRepository bookingDetailsRepository;
        @Autowired
        private BookingStatusService bookingStatusService;
        @Autowired
        private BookingUtil bookingUtil;
        @Autowired
        private IRoomTypeRoomIdRepository roomTypeRoomIdRepository;



        public ResponseEntity<String> createBooking(String queueBookingRequest, List<Integer> roomIdsAvailable) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                QueueBookingRequestDto bookingRequestDto = objectMapper.readValue(queueBookingRequest, QueueBookingRequestDto.class);
                BookingDetails bookingDetails =bookingUtil.mapToBookingDetails(bookingRequestDto);
                // Remove extra items from roomIdsAvailable list
                Integer roomCount = Integer.valueOf(bookingRequestDto.getRoom_count());
                if (roomIdsAvailable.size() > roomCount) {
                    roomIdsAvailable = roomIdsAvailable.subList(0, roomCount);
                }
                bookingDetails.setRoomsList(roomIdsAvailable.toString());
                //update the booking id in roomTypeRoomId table
                for(int roomId : roomIdsAvailable)
                {
                    roomTypeRoomIdRepository.updateBookingIdByRoomIdAndDateRange(roomId,bookingRequestDto.getCheck_in_date(),bookingRequestDto.getCheck_out_date(),bookingDetails.getBookingId());
                }
                // Save the bookingDetails entity to the database
                bookingDetailsRepository.save(bookingDetails);
                bookingStatusService.setBookingStatus(bookingDetails.getBookingId(),true);
                String successMessage = "Booking created with booking ID: " + bookingDetails.getBookingId();
                return ResponseEntity.status(HttpStatus.CREATED).body(successMessage);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }

        public ResponseEntity<String> cancelBooking(String bookingId) {
            Optional<BookingDetails> optionalBookingDetails = bookingDetailsRepository.findById(bookingId);
            if (optionalBookingDetails.isPresent()) {
                BookingDetails bookingDetails = optionalBookingDetails.get();
                //if is deleted is already true in the table
                if (bookingDetails.getIsDeleted()) {
                    return ResponseEntity.badRequest().body("Booking with booking ID " + bookingId + " has already been cancelled.");
                } else {
                    bookingDetails.setIsDeleted(true);
                    bookingDetailsRepository.save(bookingDetails);
                    String roomsListString=bookingDetails.getRoomsList();
                    //make those room ids available again
                    roomsListString = roomsListString.replaceAll("\\[|\\]", ""); // remove square brackets from string
                    String[] roomsArray = roomsListString.split(","); // split string by comma
                    List<Integer> roomIdsList = new ArrayList<Integer>();
                    for (String room : roomsArray) {
                        roomIdsList.add(Integer.parseInt(room.trim())); // convert each string element to integer and add to list
                    }
                    for(int roomId : roomIdsList)
                    {
                        roomTypeRoomIdRepository.updateBookingIdByRoomIdAndDateRange(roomId,bookingDetails.getCheckInDate(),bookingDetails.getCheckOutDate(),"0");
                    }

                    return ResponseEntity.ok("Booking with booking ID " + bookingId + " has been cancelled successfully.");
                }
            } else {
                return ResponseEntity.badRequest().body("No booking found with booking ID " + bookingId);
            }
        }

        public BookingDetailsDto getBookingDetails(String bookingId) {
            try {
                BookingDetails bookingDetails = bookingDetailsRepository.getBookingDetails(bookingId);
                return bookingUtil.mapToBookingDetailsDto(bookingDetails);
            }
            catch (Exception e){
                throw new NoSuchElementException("Booking Id does not exist");
            }
        }
        public boolean checkForFailedBooking(String queueBookingRequest, List<Integer> roomIdsAvailableForBooking) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                QueueBookingRequestDto bookingRequestDto = objectMapper.readValue(queueBookingRequest, QueueBookingRequestDto.class);
                int roomCount= Integer.parseInt(bookingRequestDto.getRoom_count());
                if(roomIdsAvailableForBooking.size()<roomCount)
                {
                    bookingStatusService.setBookingStatus(bookingRequestDto.getBooking_id(),false);
                    return true;
                }
                else{
                    return false;
                }
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }

        public List<BookingDetailsDto> getBookingDetailsForUser(String userId) {
            Optional<List<BookingDetails>> bookingDetailsListOptional = bookingDetailsRepository.findByUserId(userId);
            if (bookingDetailsListOptional.isPresent()) {
                List<BookingDetails> bookingDetailsList = bookingDetailsListOptional.get();
                return bookingDetailsList.stream()
                        .map(bookingUtil::mapToBookingDetailsDto)
                        .collect(Collectors.toList());
            } else {
                return Collections.emptyList();
            }
        }

}



