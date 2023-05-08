package com.example.team3backend.service;

import com.example.team3backend.configuration.WebClientConfiguration;
import com.example.team3backend.constants.Enums;
import com.example.team3backend.dto.PromotionRequestDto;
import com.example.team3backend.dto.PromotionsResponseDto;
import com.example.team3backend.queries.Queries;
import com.example.team3backend.utility.DateCheckUtil;
import com.example.team3backend.utility.DefaultPromotionsUtil;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@Slf4j
public class DefaultPromotionsService {

    @Autowired
    private WebClientConfiguration webClientConfiguration;
    @Autowired
    private Queries queries;
    @Autowired
    private DefaultPromotionsUtil defaultPromotionsUtil;
    @Autowired
    private DateCheckUtil dateCheckUtil;
    private final Gson gson = new Gson();


    public ResponseEntity<Set<PromotionsResponseDto>> getDefaultPromotions(PromotionRequestDto promotionRequestBody) {
        try {

            int take = 20;
            int skip = 0;
            String response = webClientConfiguration.prepareRequest(String.format(queries.getDefaultPromotions(), take, skip))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            Set<PromotionsResponseDto> promotionsResponseDtoSet =new HashSet<>();
            long stayRange = dateCheckUtil.checkDate(promotionRequestBody.getStartDate(), promotionRequestBody.getEndDate());
            JsonObject rootNode = gson.fromJson(response, JsonObject.class);
            JsonArray listDefaultPromotions = rootNode.getAsJsonObject(Enums.QueryEnum.DATA.getValue()).getAsJsonArray(Enums.PromotionsEnum.LIST_PROMOTIONS.getValue());
            for (JsonElement jsonElement : listDefaultPromotions) {
                JsonObject jsonObject = jsonElement.getAsJsonObject();
                PromotionsResponseDto promotionDto = new PromotionsResponseDto(jsonObject);
                if (!promotionDto.isDeactivated() && defaultPromotionsUtil.checkValidPromotion(promotionDto, stayRange, promotionRequestBody)) {
                    promotionsResponseDtoSet.add(promotionDto);
                }
            }

            return new ResponseEntity<Set<PromotionsResponseDto>> (promotionsResponseDtoSet, HttpStatus.OK);
        } catch (Exception e) {
            log.error(Enums.ErrorMessageEnum.UNEXPECTED_ERROR.getValue(), e);
            throw new RuntimeException(Enums.ErrorMessageEnum.UNEXPECTED_ERROR.getValue());
        }
    }
}
