package com.example.team3backend.service;

import com.example.team3backend.constants.Enums;
import com.example.team3backend.dto.AvailableRoomResponseDto;
import com.example.team3backend.dto.AvailableRoomRequestDto;
import com.example.team3backend.configuration.WebClientConfiguration;
import com.example.team3backend.queries.Queries;
import com.example.team3backend.utility.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class SearchResultsService {

    @Autowired
    private WebClientConfiguration webClientConfiguration;
    @Autowired
    private Queries queries;
    @Autowired
    private SearchResultsUtil searchResultsUtil;
    @Autowired
    private AverageRatePerStayUtil averageRatePerStayUtil;
    @Autowired
    private ComparatorUtil comparatorUtil;
    @Autowired
    private FilterResultUtils filterResultUtils;
    @Autowired
    private DateCheckUtil dateCheckUtil;
    @Autowired
    private BestDealUtil bestDealUtil;


    public ResponseEntity<Set<AvailableRoomResponseDto>> getSearchResults(AvailableRoomRequestDto availableRoomRequestBody) {

        try {
            long stayRange = dateCheckUtil.checkDate(availableRoomRequestBody.getStartDate(), availableRoomRequestBody.getEndDate());

            Set<AvailableRoomResponseDto> availableRoomsResults = new HashSet<>();

            if (availableRoomRequestBody.getSortType() != null) {
                availableRoomsResults = new TreeSet<>(comparatorUtil.getComparator(availableRoomRequestBody.getSortType()));
            }

            String roomRatesResponse = webClientConfiguration.prepareRequest(String.format(queries.getRateBetweenDateRangeQuery(), availableRoomRequestBody.getStartDate(), availableRoomRequestBody.getEndDate(), availableRoomRequestBody.getPropertyId()))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            if (roomRatesResponse == null) {
                log.error("Failed to retrieve room rates from the API");
                throw new Exception("Failed to retrieve room rates from the API");
            }
            Map<String, Double> roomRatesResult = averageRatePerStayUtil.averageRatePerStayUtil(roomRatesResponse, stayRange, availableRoomRequestBody.getPropertyId());

            String availableRoomsResponse = webClientConfiguration.prepareRequest(String.format(queries.getSearchResultsQuery(), availableRoomRequestBody.getPropertyId(), availableRoomRequestBody.getStartDate(), availableRoomRequestBody.getEndDate()))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            if (availableRoomsResponse == null) {
                log.error(Enums.ErrorMessageEnum.API_ROOM_RETRIEVE_ERROR.getValue());
                throw new Exception(Enums.ErrorMessageEnum.API_ROOM_RETRIEVE_ERROR.getValue());
            }

            searchResultsUtil.searchResultUtility(roomRatesResult, availableRoomsResponse, stayRange, availableRoomRequestBody.getRoomCount(), availableRoomsResults);

            if (availableRoomRequestBody.getFilterTypes() != null && availableRoomRequestBody.getFilterTypes().length > 0) {
                availableRoomsResults = filterResultUtils.applyFilters(availableRoomRequestBody.getFilterTypes(), availableRoomsResults);
            }

            bestDealUtil.getBestDeal(availableRoomsResults);
            return new ResponseEntity<Set<AvailableRoomResponseDto>> (availableRoomsResults, HttpStatus.OK);
        } catch (Exception e) {
            log.error(Enums.ErrorMessageEnum.UNEXPECTED_ERROR.getValue(), e);
            throw new RuntimeException(Enums.ErrorMessageEnum.UNEXPECTED_ERROR.getValue() + e.getMessage());
        }
    }
}
