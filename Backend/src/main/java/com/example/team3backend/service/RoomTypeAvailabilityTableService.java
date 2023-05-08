package com.example.team3backend.service;
import com.example.team3backend.configuration.DynamoDbConfiguration;
import com.example.team3backend.dto.QueueBookingRequestDto;
import com.example.team3backend.dto.RoomAvailabilityTableDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.enhanced.dynamodb.*;
import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.enhanced.dynamodb.model.GetItemEnhancedRequest;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;

import java.time.LocalDateTime;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomTypeAvailabilityTableService {


    private final DynamoDbConfiguration dynamoDbConfiguration;



    public Optional<RoomAvailabilityTableDto> getRoomTypeDateRange( String roomType) {
        DynamoDbEnhancedClient enhancedClient = dynamoDbConfiguration.dynamoDbEnhancedClient();
        try {
            DynamoDbTable<RoomAvailabilityTableDto> table = enhancedClient.table("team-03-availability-table", TableSchema.fromBean(RoomAvailabilityTableDto.class));
            Key key = Key.builder()
                    .partitionValue(roomType)
                    .build();
            RoomAvailabilityTableDto dateRange = table.getItem(
                    (GetItemEnhancedRequest.Builder requestBuilder) -> requestBuilder.key(key));
            return Optional.ofNullable(dateRange);
        } catch (DynamoDbException e) {
            e.printStackTrace();
            throw new RuntimeException();
        }
    }


    public void addDateRangeToRoomType(String queueBookingRequest) {

        DynamoDbEnhancedClient enhancedClient = dynamoDbConfiguration.dynamoDbEnhancedClient();

        try{
            ObjectMapper objectMapper = new ObjectMapper();
            QueueBookingRequestDto bookingRequestDto = objectMapper.readValue(queueBookingRequest, QueueBookingRequestDto.class);
            String roomType=bookingRequestDto.getRoom_type();
            LocalDateTime startDate = LocalDateTime.parse(bookingRequestDto.getCheck_in_date(), DateTimeFormatter.ISO_DATE_TIME);
            LocalDateTime endDate = LocalDateTime.parse(bookingRequestDto.getCheck_out_date(), DateTimeFormatter.ISO_DATE_TIME);

            DynamoDbTable<RoomAvailabilityTableDto> table = enhancedClient.table("team-03-availability-table", TableSchema.fromBean(RoomAvailabilityTableDto.class));
            RoomAvailabilityTableDto existingRoomType = getRoomTypeDateRange(roomType).orElse(null);

            if (existingRoomType != null) {
                // Room type exists, update the date range
                String existingDateRangeJson = existingRoomType.getDateRange();
                Map<String, String> existingDateRange = objectMapper.readValue(existingDateRangeJson, new TypeReference<Map<String, String>>() {});
                LocalDateTime date = startDate;
                while (!date.isAfter(endDate)) {
                    String dateStr = date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
                    existingDateRange.put(dateStr, "true");
                    date = date.plusDays(1);
                }
                String updatedDateRangeJson = objectMapper.writeValueAsString(existingDateRange);
                existingRoomType.setDateRange(updatedDateRangeJson);
                table.updateItem(existingRoomType);
            } else {
                // Room type does not exist, create a new one with the date range
                RoomAvailabilityTableDto newRoomType = new RoomAvailabilityTableDto();
                newRoomType.setRoomType(roomType);
                Map<String, String> newDateRange = new HashMap<>();
                LocalDateTime date = startDate;
                while (!date.isAfter(endDate)) {
                    String dateStr = date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
                    newDateRange.put(dateStr, "true");
                    date = date.plusDays(1);
                }
                String newDateRangeJson = objectMapper.writeValueAsString(newDateRange);
                newRoomType.setDateRange(newDateRangeJson);
                table.putItem(newRoomType);
            }


        }
        catch (DynamoDbException e){
            e.printStackTrace();
            throw new RuntimeException();
        } catch (JsonMappingException e) {
            throw new RuntimeException(e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteDateRangeFromRoomType(String queueBookingRequest) {

        DynamoDbEnhancedClient enhancedClient = dynamoDbConfiguration.dynamoDbEnhancedClient();

        try{
            ObjectMapper objectMapper = new ObjectMapper();
            QueueBookingRequestDto bookingRequestDto = objectMapper.readValue(queueBookingRequest, QueueBookingRequestDto.class);
            String roomType=bookingRequestDto.getRoom_type();
            LocalDateTime startDate = LocalDateTime.parse(bookingRequestDto.getCheck_in_date(), DateTimeFormatter.ISO_DATE_TIME);
            LocalDateTime endDate = LocalDateTime.parse(bookingRequestDto.getCheck_out_date(), DateTimeFormatter.ISO_DATE_TIME);

            DynamoDbTable<RoomAvailabilityTableDto> table = enhancedClient.table("team-03-availability-table", TableSchema.fromBean(RoomAvailabilityTableDto.class));
            RoomAvailabilityTableDto existingRoomType = getRoomTypeDateRange(roomType).orElse(null);

            if (existingRoomType != null) {
                // Room type exists, update the date range
                String existingDateRangeJson = existingRoomType.getDateRange();
                Map<String, String> existingDateRange = objectMapper.readValue(existingDateRangeJson, new TypeReference<Map<String, String>>() {});
                LocalDateTime date = startDate;
                while (!date.isAfter(endDate)) {
                    String dateStr = date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
                    existingDateRange.remove(dateStr);
                    date = date.plusDays(1);
                }
                String updatedDateRangeJson = objectMapper.writeValueAsString(existingDateRange);
                existingRoomType.setDateRange(updatedDateRangeJson);
                table.updateItem(existingRoomType);
                //getRoomTypeDateRange(roomType);

            } else {
                // Room type does not exist, throw an exception
                log.error("room type not found");
            }

        }
        catch (DynamoDbException e){
            e.printStackTrace();
            throw new RuntimeException();
        } catch (JsonMappingException e) {
            throw new RuntimeException(e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}


