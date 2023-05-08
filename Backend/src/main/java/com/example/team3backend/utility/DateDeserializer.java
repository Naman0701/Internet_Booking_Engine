package com.example.team3backend.utility;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class DateDeserializer {

    public List<LocalDate> getDateList(String jsonString) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Boolean> dateMap = mapper.readValue(jsonString, Map.class);
        List<LocalDate> dateList = new ArrayList<>();
        for (String dateString : dateMap.keySet()) {
            Instant instant = Instant.parse(dateString);
            LocalDate localDate = instant.atZone(ZoneOffset.UTC).toLocalDate();
            dateList.add(localDate);
        }
        return dateList;
    }
}
