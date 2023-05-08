package com.example.team3backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class BookingStatusDto {
    private Boolean bookingStatus;
    private String bookingId;
}
