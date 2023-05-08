package com.example.team3backend.repository;

import com.example.team3backend.entity.RoomTypeRoomId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;


public interface IRoomTypeRoomIdRepository extends JpaRepository<RoomTypeRoomId, UUID> {

    @Query("SELECT rtr.roomId FROM RoomTypeRoomId rtr "
            + "WHERE rtr.roomType = :roomType "
            + "AND rtr.bookingId = '0' "
            + "AND rtr.date >= :checkInDate "
            + "AND rtr.date < :checkOutDate "
            + "GROUP BY rtr.roomId "
            + "HAVING COUNT(*) = :numDays")
    List<Integer> findAvailableRoomIdsForDateRange(@Param("roomType") String roomType,
                                                   @Param("checkInDate") String checkInDate,
                                                   @Param("checkOutDate") String checkOutDate,
                                                   @Param("numDays") long numDays);

    @Modifying
    @Transactional
    @Query("UPDATE RoomTypeRoomId rtr "
            + "SET rtr.bookingId = :bookingId "
            + "WHERE rtr.roomId = :roomId "
            + "AND rtr.date >= :checkInDate "
            + "AND rtr.date < :checkOutDate")
    void updateBookingIdByRoomIdAndDateRange(@Param("roomId") int roomId,
                                             @Param("checkInDate") String checkInDate,
                                             @Param("checkOutDate") String checkOutDate,
                                             @Param("bookingId") String bookingId);
}


