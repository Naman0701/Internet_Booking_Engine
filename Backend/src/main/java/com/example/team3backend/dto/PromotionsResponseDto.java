package com.example.team3backend.dto;

import com.example.team3backend.constants.Enums;
import com.example.team3backend.entity.CustomPromotion;
import com.google.gson.JsonObject;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PromotionsResponseDto {
    private String promoCode = null;
    @NotNull
    private boolean isDeactivated;
    @NotNull
    private Integer minimumDaysOfStay;
    @NotNull
    private Float priceFactor;
    @NotNull
    private String promotionDescription;
    @NotNull
    private String promotionTitle;
    @NotNull
    private Integer promotionId;

    public PromotionsResponseDto(JsonObject jsonObject) {
        this.isDeactivated = jsonObject.get(Enums.PromotionsEnum.IS_DEACTIVATED.getValue()).getAsBoolean();
        this.minimumDaysOfStay = jsonObject.get(Enums.PromotionsEnum.MINIMUM_DAYS_OF_STAY.getValue()).getAsInt();
        this.priceFactor = jsonObject.get(Enums.PromotionsEnum.PRICE_FACTOR.getValue()).getAsFloat();
        this.promotionDescription = jsonObject.get(Enums.PromotionsEnum.PROMOTION_DESCRIPTION.getValue()).getAsString();
        this.promotionTitle = jsonObject.get(Enums.PromotionsEnum.PROMOTION_TITLE.getValue()).getAsString().toUpperCase().replace(" ", "_");
        this.promotionId = jsonObject.get(Enums.PromotionsEnum.PROMOTION_ID.getValue()).getAsInt();
    }
    public PromotionsResponseDto(CustomPromotion customPromotion) {
        this(customPromotion.getPromoCode(), customPromotion.isDeactivated(),
                customPromotion.getMinimumDaysOfStay(), customPromotion.getPriceFactor(),
                customPromotion.getPromotionDescription(), customPromotion.getPromotionTitle(),
                customPromotion.getPromotionId());
    }

}
