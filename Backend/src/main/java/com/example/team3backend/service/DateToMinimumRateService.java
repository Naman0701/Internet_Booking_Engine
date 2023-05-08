package com.example.team3backend.service;

import com.example.team3backend.configuration.WebClientConfiguration;
import com.example.team3backend.queries.Queries;
import com.example.team3backend.utility.FindMinimumNightlyRatesUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DateToMinimumRateService {

    @Autowired
    private
    WebClientConfiguration webClientConfiguration;
    @Autowired
    private Queries queries;
    @Autowired
    FindMinimumNightlyRatesUtil findMinimumNightlyRates;


    public ResponseEntity<Map<String,Long>> GraphQLUtil() {

        int take = 1000;
        int skip = 0;
        Map<String,Long> minimumNightlyRate=new HashMap<>();

        String response =webClientConfiguration.prepareRequest(String.format(queries.getMinimumNightlyRateQuery(),take,skip))
                .retrieve()
                .bodyToMono(String.class)
                .block();

        minimumNightlyRate=findMinimumNightlyRates.findMinimumNightlyRates(response);


        if(minimumNightlyRate.size()==0)
        {
            minimumNightlyRate.put("noValue",1L);
        }

        return new ResponseEntity<Map<String,Long>> (minimumNightlyRate, HttpStatus.OK);
    }
}
