package com.example.team3backend.constants;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Constants {
    public static class ApiResponseConstants {
        public static final String PUSH_BOOKING_SUCCESS="Booking Request Pushed to Queue successfully.";
        public static final String PRICE_BREAK_DOWN_SUCCESS = "The request was successful, and the response body contains the price breakdown of the room for selected date range.";
        public static final String MINIMUM_NIGHTLY_RATE_SUCCESS = "The request was successful, and the response body contains the minimum rate of a room on a day.";
        public static final String SEARCH_RESULT_SUCCESS = "The request was successful, and the response body contains the available rooms are fetched.";
        public static final String DEFAULT_PROMOTION_SUCCESS = "The request was successful, and the response body contains the default promotion fetched from graphQL.";
        public static final String CUSTOM_PROMOTION_SUCCESS = "The request was successful, and the response body contains the custom promotion fetched from RDS.";
        public static final String RATING_SUCCESS = "The request was successful, and the rating was updated.";
        public static final String BOOKING_DETAILS_SUCCESS= "Booking details fetched successfully.";
        public static final String AUTH_ERROR = "Authentication credentials were missing or incorrect, and the client is not authorized to access the requested resource.";
        public static final String PERMISSION_ERROR = "The client does not have sufficient permissions to access the requested resource.";
        public static final String NOT_FOUND_ERROR = "The requested resource was not found on the server.";
        public static final String SERVER_ERROR = "The server encountered an unexpected error while processing the request.";
        public static final String BOOKING_CREATED = "Booking done successfully.";
    }

    public static class ControllerEndpointsConstants {
        public static final String PUSH_BOOKING="/push-booking";

        public static final String MINIMUM_RATE = "/minimum-rate";
        public static final String BOOKINGS="/bookings";

        public static final String SEARCH_RESULT = "/search-results";

        public static final String TEST = "/test";

        public static final String RATING="/rating";

        public static final String DEFAULT_PROMOTION = "/defaultPromotions";

        public static final String CUSTOM_PROMOTION = "/customPromotion";

        public static final String PRICE_BREAK_DOWN = "/priceBreakDown";
    }

    public static class DatabaseConstants {
        public static final String SCHEMA = "ibe_schema";
        public static final String SPECIAL_OFFERS_EMAIL="special_offers_email";
        public static final String ID="id";
        public static final String ROOM_TYPE_ROOM_ID="room_type_room_id";
        public static final String ROOM_ID="room_id";
        public static final String DATE="date";
        public static final String FIRST_NAME="first_name";
        public static final String BOOKING_STATUS="booking_status";
        public static final String LAST_NAME="last_name";
        public static final String USER_SEARCH_REQUEST = "user_search_request";
        public static final String IS_RATED = "is_rated";
        public static final String BOOKING_ID = "booking_id";
        public static final String CHECK_IN_DATE = "check_in_date";
        public static final String CHECK_OUT_DATE = "check_out_date";
        public static final String MAIL_SENT = "mail_sent";
        public static final String CUSTOM_PROMOTION = "custom_promotion";
        public static final String ROOM_RATINGS = "room_ratings";
        public static final String ROOM_RATING = "room_rating";
        public static final String ROOM_TYPE = "room_type";
        public static final String REVIEW = "review";
        public static final String USER_ID = "user_id";
        public static final String SEARCH_REQUEST = "search_request";
        public static final String PROMO_CODE = "promo_code";
        public static final String PROMOTION_TITLE = "promotion_title";
        public static final String USER_EMAIL = "user_email";
        public static final String MINIMUM_DAYS_OF_STAY = "minimum_days_of_stay";
        public static final String PRICE_FACTOR = "price_factor";
        public static final String PROMOTION_DESCRIPTION = "promotion_description";
        public static final String PROMOTION_ID = "promotion_id";
        public static final String IS_DEACTIVATED = "is_deactivated";
        public static final String ERROR_MESSAGE = "error_message";
        public static final String APPLICABLE_ROOM_TYPE = "applicable_room_type";
        public static final String CREATED_AT="created_at";
        public static final String UPDATED_AT="updated_at";
        public static final String BOOKING_DETAILS_TABLE="booking_details";
        public static final String PROPERTY_ID="property_id";
        public static final String GUESTS="guests";
        public static final String PHONE="phone";
        public static final String EMAIL="email";
        public static final String IS_DELETED="is_deleted";
        public static final String CARD_NUMBER="card_number";
        public static final String BOOKING_STATUS_TABLE="booking_status";
        public static final String MAILING_ADDRESS1="mailing_address1";
        public static final String CUSTOM_PROMOTION_PROMO_CODE="custom_promotion_promo_code";
        public static final String ROOMS_LIST="rooms_list";
        public static final String ROOM_COUNT="room_count";
        public static final String ZIP="zip";
        public static final String STATE="state";
        public static final String COUNTRY="country";
        public static final String TOTAL_FOR_STAY="total_for_stay";
        public static final String VAT="vat";
        public static final String TAXES="taxes";
        public static final String SUBTOTAL="subtotal";
        public static final String NIGHTLY_RATE="nightly_rate";
        public static final String PROMO_TITLE="promo_title";


    }
    public static class SchedulerConstanta{
        public static final String CRON_JOB = "0 0 0 * * *";

    }
}