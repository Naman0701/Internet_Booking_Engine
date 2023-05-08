package com.example.team3backend.utility;

import com.example.team3backend.constants.Enums;
import com.example.team3backend.dto.PromotionRequestDto;
import com.example.team3backend.dto.PromotionsResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class DefaultPromotionsUtil {

    @Autowired
    private DateCheckUtil dateCheckUtil;

    public boolean checkValidPromotion(PromotionsResponseDto promotionDto, long stayRange, PromotionRequestDto promotionRequestBody) {
        boolean minimumStay = stayRange >= promotionDto.getMinimumDaysOfStay();
        boolean validPromotion;

        Enums.DiscountsEnum serviceConstant = Enums.DiscountsEnum.valueOf(promotionDto.getPromotionTitle());

        switch (serviceConstant) {
            case SENIOR_CITIZEN_DISCOUNT:
            case MILITARY_PERSONNEL_DISCOUNT:
            case KDU_MEMBERSHIP_DISCOUNT:
            case DISABLED_DISCOUNT:
                validPromotion = promotionRequestBody.getApplicableDiscountType() != null && promotionDto.getPromotionTitle().equalsIgnoreCase(promotionRequestBody.getApplicableDiscountType());
                break;
            case LONG_WEEKEND_DISCOUNT:
            case WEEKEND_DISCOUNT:
                validPromotion = dateCheckUtil.checkWeekend(promotionRequestBody.getStartDate(), promotionRequestBody.getEndDate(),Enums.DiscountsEnum.ALL_WEEKEND_CHECK.getValue());
                break;
            case WEEKDAYS_DISCOUNT:
                validPromotion = !dateCheckUtil.checkWeekend(promotionRequestBody.getStartDate(), promotionRequestBody.getEndDate(),Enums.DiscountsEnum.ANY_WEEKEND_CHECK.getValue());
                break;
            default: validPromotion= true;
        }

        return minimumStay && validPromotion;
    }

}
