package com.example.team3backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class BookingDetailsDto {
    private String bookingId;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String promoTitle;
    private String cardNumber;
    private String propertyId;
    private String checkInDate;
    private String checkOutDate;
    private String guests;
    private String promoDescription;
    private String nightlyRate;
    private String subtotal;
    private String taxes;
    private String vat;
    private String totalForStay;
    private String roomType;
    private List roomsList;
    private String mailingAddress1;
    private String country;
    private String state;
    private String zip;
    private String roomCount;
    private Boolean isDeleted;
}
