package com.example.team3backend.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@AllArgsConstructor
@Builder
@Data
public class QueueBookingRequestDto {

        private String booking_id;
        private String first_name;
        private String last_name;
        private String phone;
        private String email;
        private String card_number;
        private String property_id;
        private String check_in_date;
        private String check_out_date;
        private String guests;
        private String promo_title;
        private String promo_description;
        private String subtotal;
        private String taxes;
        private String vat;
        private String total_for_stay;
        private String room_type;
        private String mailing_address1;
        private String mailing_address2;
        private String country;
        private String state;
        private String city;
        private String zip;
        private String room_count;
        private String user_id;
        private Boolean send_special_offer;


        public QueueBookingRequestDto(){

        }
}
