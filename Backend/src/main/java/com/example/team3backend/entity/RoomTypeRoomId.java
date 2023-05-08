package com.example.team3backend.entity;

import com.example.team3backend.constants.Constants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = Constants.DatabaseConstants.ROOM_TYPE_ROOM_ID, schema = Constants.DatabaseConstants.SCHEMA)
public class RoomTypeRoomId {

        @Id
        @Column(name = Constants.DatabaseConstants.ID)
        private UUID id;
        @Column(name = Constants.DatabaseConstants.ROOM_ID, nullable = false)
        private Integer roomId;

        @Column(name = Constants.DatabaseConstants.ROOM_TYPE, nullable = false)
        private String roomType;

        @Column(name = Constants.DatabaseConstants.DATE, nullable = false)
        private String date;

        @Column(name = Constants.DatabaseConstants.BOOKING_ID, nullable = false)
        private String bookingId;



}


