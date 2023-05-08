package com.example.team3backend.repository;

import com.example.team3backend.entity.RoomRatings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDate;

@Repository
public interface RoomRatingRepository extends JpaRepository<RoomRatings,String> {
    @Modifying
    @Transactional
    @Query("UPDATE RoomRatings r SET r.isRated = :#{#roomRatings.isRated}, r.roomRating = :#{#roomRatings.roomRating}, r.review = :#{#roomRatings.review} WHERE r.bookingId = :#{#roomRatings.bookingId}")
    void addRating(@Param("roomRatings") RoomRatings roomRatings);
    @Query(value = "SELECT AVG(r.room_rating) FROM ibe_schema.room_ratings r WHERE r.room_type = :roomType AND r.is_rated=true", nativeQuery = true)
    Double getAverageRatingByRoomType(@Param("roomType") String roomType);
    @Query("SELECT COUNT(*) FROM RoomRatings r WHERE r.isRated = true AND r.roomType = :roomType")
    Long getCountOfRatedRooms(@Param("roomType") String roomType);



}
