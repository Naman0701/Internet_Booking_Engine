package com.example.team3backend.service;

import com.example.team3backend.constants.Enums;
import com.example.team3backend.dto.PromotionRequestDto;
import com.example.team3backend.dto.PromotionsResponseDto;
import com.example.team3backend.entity.CustomPromotion;
import com.example.team3backend.repository.CustomPromotionRepository;
import com.example.team3backend.utility.DateCheckUtil;
import com.example.team3backend.utility.DefaultPromotionsUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;


@Service
@Slf4j
public class CustomPromotionsService {

    @Autowired
    private CustomPromotionRepository customPromotionRepository;
    @Autowired
    private DefaultPromotionsUtil defaultPromotionsUtil;
    @Autowired
    DateCheckUtil dateCheckUtil;

    public ResponseEntity<PromotionsResponseDto> getCustomPromotion(PromotionRequestDto promotionRequestBody) {
        try {
            if (promotionRequestBody.getPromoCode() == null || promotionRequestBody.getRoomType() == null) {
                throw new RuntimeException();

            }
            try {
                CustomPromotion customPromotion = customPromotionRepository.findById(promotionRequestBody.getPromoCode()).get();

                long stayRange = dateCheckUtil.checkDate(promotionRequestBody.getStartDate(), promotionRequestBody.getEndDate());
                PromotionsResponseDto promotionsResponseDto = new PromotionsResponseDto(customPromotion);
                if (!customPromotion.isDeactivated() &&
                        defaultPromotionsUtil.checkValidPromotion(promotionsResponseDto, stayRange, promotionRequestBody) &&
                        promotionRequestBody.getRoomType().contains(customPromotion.getApplicableRoomType())) {
                    return new ResponseEntity<PromotionsResponseDto> (promotionsResponseDto, HttpStatus.OK);
                }
                throw new IllegalArgumentException(customPromotion.getErrorMessage());

            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException(e.getMessage());
            }
            catch (NoSuchElementException e){
                throw new NoSuchElementException(Enums.ErrorMessageEnum.INVALID_PROMO_CODE.getValue());
            }
        } catch (RuntimeException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }
}
