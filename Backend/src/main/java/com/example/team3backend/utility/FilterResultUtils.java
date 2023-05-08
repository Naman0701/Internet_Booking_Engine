package com.example.team3backend.utility;

import com.example.team3backend.constants.Enums;
import com.example.team3backend.dto.AvailableRoomResponseDto;
import com.example.team3backend.dto.FilterTypeDto;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class FilterResultUtils {
    public Set<AvailableRoomResponseDto> applyFilters(FilterTypeDto[] filterTypes, Set<AvailableRoomResponseDto> availableRoomsResults) {
        Set<AvailableRoomResponseDto> availableRoomResultsAfterFilter = new HashSet<>();
        for (FilterTypeDto filterType : filterTypes) {
            availableRoomResultsAfterFilter.addAll(filterResults(filterType, availableRoomsResults));
            availableRoomsResults.clear();
            availableRoomsResults.addAll(availableRoomResultsAfterFilter);
            availableRoomResultsAfterFilter.clear();
        }
        return availableRoomsResults;
    }

    private Set<AvailableRoomResponseDto> filterResults(FilterTypeDto filterType, Set<AvailableRoomResponseDto> availableRoomsResults) {
        String attribute = filterType.getAttribute();
        Set<String> values = new HashSet<>(Arrays.asList(filterType.getValues()));

        Predicate<AvailableRoomResponseDto> filterPredicate;

        Enums.FilterSortEnum serviceConstant = Enums.FilterSortEnum.valueOf(attribute.toUpperCase());

        switch (serviceConstant) {
            case BED:
                filterPredicate = roomResult -> values.stream().anyMatch(value -> (value.equals(Enums.FilterSortEnum.DOUBLE_BED_JAVA.getValue()) && roomResult.getDoubleBed() > 0) || (value.equals(Enums.FilterSortEnum.SINGLE_BED_JAVA.getValue()) && roomResult.getSingleBed() > 0));
                break;
            case ROOM_TYPE_NAME:
                filterPredicate = roomResult -> values.stream().anyMatch(value -> roomResult.getRoomTypeName().contains(value));
                break;
            case PRICE_TYPE_FILTER:
                filterPredicate = roomResult -> values.stream().anyMatch(value -> {
                    long filterAmountStartValue = Long.parseLong(value.split("-")[0]);
                    long filterAmountEndValue = Long.parseLong(value.split("-")[1]);
                    return roomResult.getRate() >= filterAmountStartValue && roomResult.getRate() <= filterAmountEndValue;
                });
                break;
            default:
                throw new IllegalArgumentException(Enums.ErrorMessageEnum.INVALID_ATTRIBUTE.getValue() + attribute);
        }
        return availableRoomsResults.stream().filter(filterPredicate).collect(Collectors.toSet());
    }

}
