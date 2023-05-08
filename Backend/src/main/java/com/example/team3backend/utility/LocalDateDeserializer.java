package com.example.team3backend.utility;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class LocalDateDeserializer extends JsonDeserializer<LocalDate> {

    @Override
    public LocalDate deserialize(JsonParser parser, DeserializationContext deserializationContext) throws IOException {
        String dateStr = parser.getText();
        try {
            // Parse the date string in the format "yyyy-MM-dd"
            return LocalDate.parse(dateStr.split("T")[0]);
        } catch (DateTimeParseException e) {
            // If the date string is invalid, throw an exception
            throw new IllegalArgumentException("Invalid date format. Dates should be in yyyy-MM-dd format.", e);
        }
    }

}

