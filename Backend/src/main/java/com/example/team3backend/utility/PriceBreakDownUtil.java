package com.example.team3backend.utility;

import com.example.team3backend.constants.Enums;
import com.example.team3backend.dto.AvailableRoomRequestDto;
import com.example.team3backend.dto.PriceBreakDownRequestDto;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Map;

@Service
@Slf4j
public class PriceBreakDownUtil {
    @Autowired
    private DateCheckUtil dateCheckUtil;
    private final Gson gson = new Gson();

    public void getPriceBreakDown(String response, PriceBreakDownRequestDto priceBreakDownRequestBody, Map<LocalDate, Integer> priceBreakDownMap) {
        JsonObject rootNode = gson.fromJson(response, JsonObject.class);
        JsonArray listRoomTypes = rootNode.getAsJsonObject(Enums.QueryEnum.DATA.getValue()).getAsJsonArray(Enums.QueryEnum.LIST_ROOM_TYPES.getValue());
        for (JsonElement roomTypeElement : listRoomTypes) {

            JsonObject roomTypeObject = roomTypeElement.getAsJsonObject();

            if(!priceBreakDownRequestBody.getRoomType().equalsIgnoreCase(roomTypeObject.get(Enums.RoomDetailsEnum.ROOM_TYPE_NAME.getValue()).getAsString())){
                continue;
            }
            JsonArray roomRatesArray = roomTypeObject.getAsJsonArray(Enums.RoomDetailsEnum.ROOM_RATES.getValue());
            for(JsonElement roomRateElement:roomRatesArray)
            {
                JsonObject roomRateObject = (roomRateElement.getAsJsonObject()).get(Enums.RoomDetailsEnum.ROOM_RATE.getValue()).getAsJsonObject();
                LocalDate startDate=dateCheckUtil.convertToDate(priceBreakDownRequestBody.getStartDate());
                LocalDate endDate=dateCheckUtil.convertToDate(priceBreakDownRequestBody.getEndDate());
                LocalDate currentDate=dateCheckUtil.convertToDate(roomRateObject.get(Enums.QueryEnum.DATE.getValue()).getAsString());
                if((currentDate.isAfter(startDate) && currentDate.isBefore(endDate)) || currentDate.equals(startDate) || currentDate.equals(endDate))
                {
                    Integer price=roomRateObject.get(Enums.RoomDetailsEnum.BASIC_NIGHTLY_RATE.getValue()).getAsInt();
                    priceBreakDownMap.put(currentDate,price);
                }
            }
        }
    }
}
