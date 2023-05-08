package com.example.team3backend.entity;

import com.example.team3backend.constants.Constants;
import com.example.team3backend.dto.RatingRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = Constants.DatabaseConstants.ROOM_RATINGS, schema = Constants.DatabaseConstants.SCHEMA)
public class RoomRatings {
        @Id
        @Column(name = Constants.DatabaseConstants.BOOKING_ID, nullable = false)
        private String bookingId;
        @Column(name = Constants.DatabaseConstants.ROOM_TYPE, nullable = false)
        private String roomType;
        @Column(name = Constants.DatabaseConstants.USER_EMAIL, nullable = false)
        private String userEmail;
        @Column(name = Constants.DatabaseConstants.CHECK_IN_DATE, nullable = false)
        private LocalDate checkInDate;
        @Column(name = Constants.DatabaseConstants.CHECK_OUT_DATE, nullable = false)
        private LocalDate checkOutDate;
        @Column(name = Constants.DatabaseConstants.MAIL_SENT, nullable = false)
        private Boolean mailSent;
        @Column(name = Constants.DatabaseConstants.IS_RATED, nullable = false)
        private Boolean isRated;
        @Column(name = Constants.DatabaseConstants.ROOM_RATING)
        private Float roomRating;
        @Column(name = Constants.DatabaseConstants.REVIEW)
        private String review;
    }

