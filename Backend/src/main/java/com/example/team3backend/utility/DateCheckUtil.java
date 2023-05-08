package com.example.team3backend.utility;

import com.example.team3backend.constants.Enums;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoUnit;

@Component
public class DateCheckUtil {

    public LocalDate convertToDate(String dateString){
        LocalDate date;
        try{
            date=LocalDate.parse(dateString.split("T")[0]);
            return date;
        }
        catch (DateTimeParseException e) {
            throw new IllegalArgumentException(Enums.ErrorMessageEnum.INVALID_DATE.getValue(), e);
        }
    }
    public long checkDate(String selectedStartDate, String selectedEndDate) {
        LocalDate startDate=convertToDate(selectedStartDate);
        LocalDate endDate=convertToDate(selectedEndDate);
        if (startDate.isAfter(endDate)) {
            throw new IllegalArgumentException(Enums.ErrorMessageEnum.INVALID_DATE_RANGE.getValue());
        }
        return ChronoUnit.DAYS.between(startDate, endDate) + 1;

    }

    public boolean checkWeekend(String selectedStartDate, String selectedEndDate,String checkType) {
        LocalDate startDate = LocalDate.parse(selectedStartDate.split("T")[0]);
        LocalDate endDate = LocalDate.parse(selectedEndDate.split("T")[0]);

        boolean hasSaturday = false;
        boolean hasSunday = false;

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            // Check if the current day is a Saturday or Sunday
            if (date.getDayOfWeek() == DayOfWeek.SATURDAY) {
                hasSaturday = true;
            }
            if (date.getDayOfWeek() == DayOfWeek.SUNDAY) {
                hasSunday = true;
            }

            // Exit the loop as soon as both Saturday and Sunday are found
            if (hasSaturday && hasSunday) {
                break;
            }
        }
        if(Enums.DiscountsEnum.ALL_WEEKEND_CHECK.getValue().equalsIgnoreCase(checkType))
        {
            return hasSaturday && hasSunday;

        }
        else {
            return hasSaturday || hasSunday;

        }
    }
}
