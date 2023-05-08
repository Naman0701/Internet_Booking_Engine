package com.example.team3backend.repository;

import com.example.team3backend.entity.BookingDetails;
import com.example.team3backend.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface IBookingStatusRepository extends JpaRepository<BookingStatus, String> {


    @Query(value = "SELECT * FROM ibe_schema.booking_status b WHERE b.booking_Id = :bookingId", nativeQuery = true)
    BookingStatus getBookingStatus(@Param("bookingId") String bookingId);
}