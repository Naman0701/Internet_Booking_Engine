package com.example.team3backend.utility;

import com.example.team3backend.constants.Enums;
import com.example.team3backend.dto.AvailableRoomResponseDto;
import com.example.team3backend.repository.RoomRatingRepository;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class SearchResultsUtil {

    @Autowired
    private RoomRatingRepository roomRatingRepository;
    private final Gson gson = new Gson();
    public void searchResultUtility(Map<String, Double> roomRatesResult, String response,long stayRange ,Integer roomCount, Set<AvailableRoomResponseDto> availableRoomsResults) {
        try {
            HashMap<String, Map<Long, Long>> roomTypeToRoomIds = new HashMap<>();
            HashMap<String, JsonElement> availableRoomTypesObject = new HashMap<>();

            JsonObject rootNode = gson.fromJson(response, JsonObject.class);
            JsonArray listRoomAvailabilities = rootNode.getAsJsonObject(Enums.QueryEnum.DATA.getValue()).getAsJsonArray(Enums.QueryEnum.LIST_ROOM_AVAILABILITIES.getValue());

            // Iterate through the listRoomAvailabilities in the response
            for (JsonElement availability : listRoomAvailabilities) {
                String roomTypeName = availability.getAsJsonObject().get(Enums.RoomDetailsEnum.ROOM.getValue()).getAsJsonObject().get(Enums.RoomDetailsEnum.ROOM_TYPE.getValue()).getAsJsonObject().get(Enums.RoomDetailsEnum.ROOM_TYPE_NAME.getValue()).getAsString();
                Long roomId = availability.getAsJsonObject().get(Enums.RoomDetailsEnum.ROOM_ID.getValue()).getAsLong();
                JsonElement roomTypeElement = availability.getAsJsonObject().get(Enums.RoomDetailsEnum.ROOM.getValue()).getAsJsonObject().get(Enums.RoomDetailsEnum.ROOM_TYPE.getValue());

                if (!availableRoomTypesObject.containsKey(roomTypeName)) {
                    availableRoomTypesObject.put(roomTypeName, roomTypeElement);
                }

                // Check if the room type is already in the map
                if (!roomTypeToRoomIds.containsKey(roomTypeName)) {
                    // If the room type is not in the map, add an entry for it
                    roomTypeToRoomIds.put(roomTypeName, new HashMap<>());
                }

                // Get the room count map for the current room type
                Map<Long, Long> roomCountMap = roomTypeToRoomIds.get(roomTypeName);

                // Update the count for the current room id
                if (roomCountMap.containsKey(roomId)) {
                    roomCountMap.put(roomId, roomCountMap.get(roomId) + 1L);
                } else {
                    roomCountMap.put(roomId, 1L);
                }
            }

            // Iterate through the HashMap entries
            for (String roomTypeName : roomTypeToRoomIds.keySet()) {
                Map<Long, Long> roomIds = roomTypeToRoomIds.get(roomTypeName);
                long roomsAvailableBetweenDateRange = 0;
                for (Map.Entry<Long, Long> roomId : roomIds.entrySet()) {
                    long value = roomId.getValue();
                    if (value >= stayRange) {
                        roomsAvailableBetweenDateRange += 1L;
                    }
                }

                // Check if the ArrayList size is equal to the desired number of rooms
                if (roomsAvailableBetweenDateRange < roomCount) {
                    availableRoomTypesObject.remove(roomTypeName);
                } else {
                    JsonObject jsonObject = availableRoomTypesObject.get(roomTypeName).getAsJsonObject();
                    Double roomRate = roomRatesResult.get(roomTypeName);
                    if (roomRate == null) {
                        log.error(Enums.ErrorMessageEnum.ROOM_NOT_FOUND.getValue() + roomTypeName);
                        continue;
                    }
                    String roomType=jsonObject.get(Enums.RoomDetailsEnum.ROOM_TYPE_NAME.getValue()).getAsString();
                    Double rating=roomRatingRepository.getAverageRatingByRoomType(roomType);
                    String ratingAsString = rating == null ? "N/A" : String.format("%.1f", rating);
                    Long reviewers=roomRatingRepository.getCountOfRatedRooms(roomType);
                    availableRoomsResults.add(new AvailableRoomResponseDto(jsonObject, roomRate,ratingAsString,reviewers));

                }
            }
        } catch (Exception e) {
            log.error(Enums.ErrorMessageEnum.UNEXPECTED_ERROR.getValue() + e.getMessage());
        }
    }
}