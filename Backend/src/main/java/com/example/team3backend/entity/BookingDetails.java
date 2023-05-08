package com.example.team3backend.entity;
import com.example.team3backend.constants.Constants;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = Constants.DatabaseConstants.BOOKING_DETAILS_TABLE, schema = Constants.DatabaseConstants.SCHEMA)
public class BookingDetails {
    @Id
    @Column(name = Constants.DatabaseConstants.BOOKING_ID, nullable = false)
    private String bookingId;
    @Column(name = Constants.DatabaseConstants.FIRST_NAME, nullable = false)
    private String firstName;
    @Column(name=Constants.DatabaseConstants.USER_ID)
    private String userId;
    @Column(name = Constants.DatabaseConstants.LAST_NAME)
    private String lastName;
    @Column(name = Constants.DatabaseConstants.PHONE)
    private String phone;
    @Column(name = Constants.DatabaseConstants.EMAIL, nullable = false)
    private String email;
    @Column(name = Constants.DatabaseConstants.CARD_NUMBER, nullable = false)
    private String cardNumber;
    @Column(name = Constants.DatabaseConstants.PROPERTY_ID, nullable = false)
    private String propertyId;
    @Column(name = Constants.DatabaseConstants.CHECK_IN_DATE, nullable = false)
    private String checkInDate;
    @Column(name = Constants.DatabaseConstants.CHECK_OUT_DATE, nullable = false)
    private String checkOutDate;
    @Column(name = Constants.DatabaseConstants.GUESTS, nullable = false)
    private String guests;
    @Column(name = Constants.DatabaseConstants.PROMO_TITLE)
    private String promoTitle;
    @Column(name = Constants.DatabaseConstants.PROMOTION_DESCRIPTION)
    private String promoDescription;
    @Column(name = Constants.DatabaseConstants.NIGHTLY_RATE, nullable = false)
    private String nightlyRate;
    @Column(name = Constants.DatabaseConstants.SUBTOTAL)
    private String subtotal;
    @Column(name = Constants.DatabaseConstants.TAXES)
    private String taxes;
    @Column(name = Constants.DatabaseConstants.VAT)
    private String vat;
    @Column(name = Constants.DatabaseConstants.TOTAL_FOR_STAY, nullable = false)
    private String totalForStay;
    @Column(name = Constants.DatabaseConstants.ROOM_TYPE, nullable = false)
    private String roomType;
    @Column(name = Constants.DatabaseConstants.MAILING_ADDRESS1)
    private String mailingAddress1;
    @Column(name = Constants.DatabaseConstants.COUNTRY)
    private String country;
    @Column(name = Constants.DatabaseConstants.STATE)
    private String state;
    @Column(name = Constants.DatabaseConstants.ZIP)
    private String zip;
    @Column(name = Constants.DatabaseConstants.ROOM_COUNT)
    private String roomCount;
    @Column(name = Constants.DatabaseConstants.ROOMS_LIST)
    private String roomsList;

    @Column(name = Constants.DatabaseConstants.IS_DELETED, nullable = false)
    private Boolean isDeleted;

    @CreationTimestamp
    @Column(name = Constants.DatabaseConstants.CREATED_AT, nullable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = Constants.DatabaseConstants.UPDATED_AT, nullable = false)
    private OffsetDateTime updatedAt;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = Constants.DatabaseConstants.CUSTOM_PROMOTION_PROMO_CODE)
    private CustomPromotion customPromotion;

}
