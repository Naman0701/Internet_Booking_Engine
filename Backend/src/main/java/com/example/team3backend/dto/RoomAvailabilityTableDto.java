package com.example.team3backend.dto;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

/**
 *  Entity class representing the RoomAvailabilityTable table in DynamoDB.
 */
@DynamoDbBean
public class RoomAvailabilityTableDto {


    private String roomType;
    private String dateRange;

    public String getDateRange() {
        return dateRange;
    }

    public void setDateRange(String dateRange) {
        this.dateRange = dateRange;
    }

    @DynamoDbPartitionKey
    public String getRoomType() {
        return roomType;
    }

    @Override
    public String toString() {
        return "RoomAvailabilityTableDto{" +
                "RoomType='" + roomType + '\'' +
                ", DateRange='" + dateRange + '\'' +
                '}';
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }
    
}

