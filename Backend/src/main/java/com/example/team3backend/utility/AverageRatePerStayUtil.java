package com.example.team3backend.utility;

import com.example.team3backend.constants.Enums;
import com.google.gson.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class AverageRatePerStayUtil {

    private final Gson gson = new Gson();


    public Map<String, Double> averageRatePerStayUtil(String response, long stayRange, Integer requestPropertyId) throws IllegalArgumentException {

        Map<String, Double> roomTypeToRateMap = new HashMap<>();

        JsonObject rootNode = gson.fromJson(response, JsonObject.class);

        JsonArray roomRates = rootNode.getAsJsonObject(Enums.QueryEnum.DATA.getValue()).getAsJsonObject()
                .getAsJsonArray(Enums.QueryEnum.LIST_ROOM_RATES.getValue());

        for (JsonElement roomRateElement : roomRates) {
            JsonObject roomRateObject = roomRateElement.getAsJsonObject();

            Double roomTypeRate = roomRateObject.getAsJsonObject().get(Enums.RoomDetailsEnum.BASIC_NIGHTLY_RATE.getValue()).getAsDouble();

            JsonArray roomTypesArray = roomRateObject.getAsJsonArray(Enums.RoomDetailsEnum.ROOM_TYPES.getValue());
            for (JsonElement roomTypeElement : roomTypesArray) {
                JsonObject roomTypeObj = roomTypeElement.getAsJsonObject();
                JsonObject roomType = roomTypeObj.getAsJsonObject(Enums.RoomDetailsEnum.ROOM_TYPE.getValue());
                int propertyId = roomType.get(Enums.RoomDetailsEnum.PROPERTY_ID.getValue()).getAsInt();
                String roomTypeName = roomType.get(Enums.RoomDetailsEnum.ROOM_TYPE_NAME.getValue()).getAsString();
                if (propertyId != requestPropertyId) {
                    continue;
                }
                if (roomTypeToRateMap.containsKey(roomTypeName)) {
                    roomTypeToRateMap.put(roomTypeName, roomTypeToRateMap.get(roomTypeName) + roomTypeRate);
                } else {
                    roomTypeToRateMap.put(roomTypeName, roomTypeRate);
                }
            }

        }
        for (Map.Entry<String, Double> roomTypeToRate : roomTypeToRateMap.entrySet()) {
            Double value = roomTypeToRate.getValue();
            value = value / stayRange;
            value = Math.round(value * 100.0) / 100.0; // rounding off to 2 decimal places

            roomTypeToRate.setValue(value);

        }
        return roomTypeToRateMap;

    }


}
