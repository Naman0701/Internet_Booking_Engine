package com.example.team3backend.entity;

import com.example.team3backend.constants.Constants;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = Constants.DatabaseConstants.CUSTOM_PROMOTION, schema = Constants.DatabaseConstants.SCHEMA)
public class CustomPromotion{
    @Id
    @Column(name = Constants.DatabaseConstants.PROMO_CODE, nullable = false)
    private String promoCode;

    @Column(name = Constants.DatabaseConstants.PROMOTION_TITLE, nullable = false)
    private String promotionTitle;

    @Column(name = Constants.DatabaseConstants.IS_DEACTIVATED, nullable = false)
    private boolean isDeactivated;

    @Column(name = Constants.DatabaseConstants.MINIMUM_DAYS_OF_STAY, nullable = false)
    private Integer minimumDaysOfStay;

    @Column(name = Constants.DatabaseConstants.PRICE_FACTOR, nullable = false)
    private Float priceFactor;

    @Column(name = Constants.DatabaseConstants.PROMOTION_DESCRIPTION, nullable = false)
    private String promotionDescription;

    @Column(name = Constants.DatabaseConstants.APPLICABLE_ROOM_TYPE, nullable = false)
    private String applicableRoomType;

    @Column(name = Constants.DatabaseConstants.PROMOTION_ID, nullable = false)
    private Integer promotionId;

    @Column(name = Constants.DatabaseConstants.ERROR_MESSAGE, nullable = false)
    private String errorMessage;
}
