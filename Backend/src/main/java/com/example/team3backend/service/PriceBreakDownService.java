package com.example.team3backend.service;

import com.example.team3backend.configuration.WebClientConfiguration;
import com.example.team3backend.constants.Enums;
import com.example.team3backend.dto.PriceBreakDownRequestDto;
import com.example.team3backend.queries.Queries;
import com.example.team3backend.utility.PriceBreakDownUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class PriceBreakDownService {

    @Autowired
    private WebClientConfiguration webClientConfiguration;
    @Autowired
    private Queries queries;
    @Autowired
    private PriceBreakDownUtil priceBreakDownUtil;
    public ResponseEntity<Map<LocalDate,Integer>> getPriceBreakDown(PriceBreakDownRequestDto priceBreakDownRequestBody) {
        try {

            int take = 1000;
            int skip = 0;
            String response = webClientConfiguration.prepareRequest(String.format(queries.getRoomRatesBreakDown(),priceBreakDownRequestBody.getPropertyId(), skip, take))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            if (response == null) {
                log.error(Enums.ErrorMessageEnum.API_PRICE_RETRIEVE_ERROR.getValue());
                throw new RuntimeException(Enums.ErrorMessageEnum.API_PRICE_RETRIEVE_ERROR.getValue());
            }
            Map<LocalDate,Integer> priceBreakDownMap=new HashMap<>();
            priceBreakDownUtil.getPriceBreakDown(response,priceBreakDownRequestBody,priceBreakDownMap);
            return new ResponseEntity<Map<LocalDate,Integer>> (priceBreakDownMap, HttpStatus.OK);

        } catch (Exception e) {
            log.error(Enums.ErrorMessageEnum.UNEXPECTED_ERROR.getValue(), e);
            throw new RuntimeException(Enums.ErrorMessageEnum.UNEXPECTED_ERROR.getValue());
        }
    }
}
