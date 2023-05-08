package com.example.team3backend.repository;

import com.example.team3backend.entity.BookingDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IBookingDetailsRepository extends JpaRepository<BookingDetails,String> {
    Optional<List<BookingDetails>> findByUserId(String userId);

    @Query(value = "SELECT * FROM ibe_schema.booking_details b WHERE b.booking_Id = :bookingId", nativeQuery = true)
    BookingDetails getBookingDetails(@Param("bookingId") String bookingId);
}