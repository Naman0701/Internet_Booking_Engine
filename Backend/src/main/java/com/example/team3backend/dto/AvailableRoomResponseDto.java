package com.example.team3backend.dto;

import com.example.team3backend.constants.Enums;
import com.google.gson.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class AvailableRoomResponseDto
{
    private String roomTypeName;
    private String roomTypeId;
    private Integer singleBed;
    private Integer doubleBed;
    private Integer totalBeds;
    private Integer maxCapacity;
    private Integer areaInSquareFeet;
    private Boolean specialDeal;
    private String specialDealDescription;
    private Double rate;
    private String rating;
    private Long reviewers;

    public AvailableRoomResponseDto(JsonObject jsonObject, Double price,String rating,Long reviewers) {
        try {
            roomTypeName = jsonObject.get(Enums.RoomDetailsEnum.ROOM_TYPE_NAME.getValue()).getAsString();
            roomTypeId = jsonObject.get(Enums.RoomDetailsEnum.ROOM_TYPE_ID.getValue()).getAsString();
            singleBed = jsonObject.get(Enums.RoomDetailsEnum.SINGLE_BED.getValue()).getAsInt();
            doubleBed = jsonObject.get(Enums.RoomDetailsEnum.DOUBLE_BED.getValue()).getAsInt();
            totalBeds = jsonObject.get(Enums.RoomDetailsEnum.SINGLE_BED.getValue()).getAsInt() + jsonObject.get(Enums.RoomDetailsEnum.DOUBLE_BED.getValue()).getAsInt();
            maxCapacity = jsonObject.get(Enums.RoomDetailsEnum.MAX_CAPACITY.getValue()).getAsInt();
            areaInSquareFeet = jsonObject.get(Enums.RoomDetailsEnum.AREA_IN_SQUARE_FEET.getValue()).getAsInt();
            rate = price;
            this.rating=rating;
            this.reviewers=reviewers;
        }
        catch (Exception e)
        {
            log.error("Invalid JSON Object"+e.getMessage());
        }
    }
}