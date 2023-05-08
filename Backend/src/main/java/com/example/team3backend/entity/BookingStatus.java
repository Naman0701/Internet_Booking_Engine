package com.example.team3backend.entity;

import com.example.team3backend.constants.Constants;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = Constants.DatabaseConstants.BOOKING_STATUS_TABLE, schema = Constants.DatabaseConstants.SCHEMA)
@Entity
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class BookingStatus {
    @Id
    @Column(name = Constants.DatabaseConstants.BOOKING_ID)
    private String bookingId;
    @Column(name = Constants.DatabaseConstants.BOOKING_STATUS,nullable = false)
    private Boolean bookingStatus;

}
