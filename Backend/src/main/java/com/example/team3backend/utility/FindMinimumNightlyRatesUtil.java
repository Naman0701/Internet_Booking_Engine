package com.example.team3backend.utility;

import com.example.team3backend.constants.Enums;
import com.google.gson.*;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
public class FindMinimumNightlyRatesUtil {

    private final Gson gson = new Gson();

    public ConcurrentHashMap<String, Long> findMinimumNightlyRates(String response) {

        if (response == null || response.isEmpty()) {
            return new ConcurrentHashMap<>();
        }
        try {
            JsonObject rootNode = gson.fromJson(response, JsonObject.class);
            JsonArray listRoomTypes = rootNode.getAsJsonObject(Enums.QueryEnum.DATA.getValue()).getAsJsonArray(Enums.QueryEnum.LIST_ROOM_TYPES.getValue());

            ConcurrentHashMap<String, Long> minimumNightlyRate = new ConcurrentHashMap<>();

            for (JsonElement roomTypeNode : listRoomTypes) {
                JsonArray roomRates = roomTypeNode.getAsJsonObject().getAsJsonArray(Enums.RoomDetailsEnum.ROOM_RATES.getValue());
                for (JsonElement roomRateNode : roomRates) {
                    JsonObject rateNode = roomRateNode.getAsJsonObject().getAsJsonObject(Enums.RoomDetailsEnum.ROOM_RATE.getValue());

                    Long basicNightlyRate = rateNode.get(Enums.RoomDetailsEnum.BASIC_NIGHTLY_RATE.getValue()).getAsLong();
                    String date = rateNode.get(Enums.QueryEnum.DATE.getValue()).getAsString().split("T")[0];

                    minimumNightlyRate.merge(date, basicNightlyRate, Long::min);
                }
            }

            return minimumNightlyRate;
        }
        catch (JsonSyntaxException e) {
            return new ConcurrentHashMap<>();
        }
    }
}
