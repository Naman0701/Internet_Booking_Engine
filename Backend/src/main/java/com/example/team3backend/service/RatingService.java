package com.example.team3backend.service;


import com.example.team3backend.constants.Enums;
import com.example.team3backend.dto.RatingRequestDto;
import com.example.team3backend.dto.RatingResponseDto;
import com.example.team3backend.entity.RoomRatings;

import com.example.team3backend.repository.RoomRatingRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.transaction.Transactional;
import java.util.NoSuchElementException;

@Service
@Slf4j
@Transactional
public class RatingService {

    @Autowired
    private RoomRatingRepository roomRatingRepository;
    public ResponseEntity<RatingResponseDto> submitRating(RatingRequestDto ratingRequestDto) {
        try {
            if(!roomRatingRepository.existsById(ratingRequestDto.getBookingId())) {
                throw new NoSuchElementException(Enums.ErrorMessageEnum.INVALID_BOOKING_ID.getValue());

            }
            RoomRatings roomRatings = roomRatingRepository.findById(ratingRequestDto.getBookingId()).get();
            if(roomRatings.getIsRated())
            {
                throw new EntityExistsException(Enums.ErrorMessageEnum.RATING_EXIST.getValue());
            }
            roomRatings.setIsRated(true);
            roomRatings.setRoomRating(Float.valueOf(ratingRequestDto.getRating()));
            roomRatings.setReview(ratingRequestDto.getReview());
            roomRatingRepository.addRating(roomRatings);
            return new ResponseEntity<RatingResponseDto>(new RatingResponseDto(Enums.RatingsEnum.FEEDBACK_SUCCESS.getValue()), HttpStatus.OK);
        }
        catch (IllegalArgumentException e) {
            log.error(Enums.ErrorMessageEnum.UNEXPECTED_ERROR.getValue(), e);
            throw new RuntimeException(e.getMessage());
        }
    }
}
