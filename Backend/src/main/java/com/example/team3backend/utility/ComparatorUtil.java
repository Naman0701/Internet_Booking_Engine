package com.example.team3backend.utility;

import com.example.team3backend.constants.Enums;
import com.example.team3backend.dto.AvailableRoomResponseDto;
import com.example.team3backend.dto.SortTypeDto;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.function.Function;

@Component
public class ComparatorUtil {
    private <T> Comparator<T> getComparatorHelper(SortTypeDto sortType, Function<T, Comparable> comparingFunction, Function<T, Comparable> thenComparingFunction) {
        Comparator<T> comparator = Comparator.comparing(comparingFunction).thenComparing(thenComparingFunction);
        if (Enums.FilterSortEnum.DESCENDING.getValue().equals(sortType.getOrder())) {
            comparator = comparator.reversed();
        }
        return comparator;
    }

    public Comparator<AvailableRoomResponseDto> getComparator(SortTypeDto sortType) {
        Enums.FilterSortEnum attribute = Enums.FilterSortEnum.valueOf(sortType.getAttribute().toUpperCase());
        switch (attribute) {
            case PRICE:
                return getComparatorHelper(sortType, AvailableRoomResponseDto::getRate, AvailableRoomResponseDto::getRoomTypeName);
            case AREA:
                return getComparatorHelper(sortType, AvailableRoomResponseDto::getAreaInSquareFeet, AvailableRoomResponseDto::getRoomTypeName);
            case ROOM_TYPE_NAME:
                return getComparatorHelper(sortType, AvailableRoomResponseDto::getRoomTypeName, AvailableRoomResponseDto::getRate);
            case BED:
                return getComparatorHelper(sortType, AvailableRoomResponseDto::getTotalBeds, AvailableRoomResponseDto::getRoomTypeName);
            default:
                throw new IllegalArgumentException(Enums.ErrorMessageEnum.INVALID_ATTRIBUTE.getValue() + attribute.getValue());
        }
    }
}
