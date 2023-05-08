package com.example.team3backend.service;

import com.example.team3backend.entity.BookingStatus;
import com.example.team3backend.repository.IBookingStatusRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@Slf4j
public class BookingStatusService {

    @Autowired
    private IBookingStatusRepository bookingStatusRepository;

    public BookingStatus getBookingStatus(String bookingId) {
        BookingStatus bookingStatus = bookingStatusRepository.getBookingStatus(bookingId);
        if (bookingStatus == null) {
            throw new NoSuchElementException("Booking Id does not exist");
        }
        return bookingStatus;
    }

    public BookingStatus setBookingStatus(String bookingId, Boolean status) {
        BookingStatus bookingStatus = new BookingStatus(bookingId, status);
        return bookingStatusRepository.save(bookingStatus);
    }
}
