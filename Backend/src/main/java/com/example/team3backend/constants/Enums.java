package com.example.team3backend.constants;

import lombok.Getter;

@Getter
public class Enums {

    @Getter
    public enum FilterSortEnum {
        ASCENDING("ASC"),
        DESCENDING("DESC"),
        PRICE("Price"),

        AREA("Area"),
        BED("bed"),
        ROOM_TYPE_NAME("room_type_name"),

        SINGLE_BED_JAVA("Single Bed"),
        DOUBLE_BED_JAVA("Double Bed"),
        PRICE_TYPE_FILTER("price_type_filter"),

        RATING("Rating");

        private final String value;

        FilterSortEnum(String value) {
            this.value = value;
        }
    }
    @Getter
    public enum RoomDetailsEnum {
        ROOM_TYPE_ID("room_type_id"),
        ROOM_TYPE_NAME("room_type_name"),
        MAX_CAPACITY("max_capacity"),

        AREA_IN_SQUARE_FEET("area_in_square_feet"),
        SINGLE_BED("single_bed"),
        DOUBLE_BED("double_bed"),

        BASIC_NIGHTLY_RATE("basic_nightly_rate"),
        ROOM_TYPES("room_types"),
        PROPERTY_ID("property_id"),

        ROOM_RATES("room_rates"),
        ROOM_RATE("room_rate"),
        ROOM_ID("room_id"),

        ROOM_TYPE("room_type"),
        ROOM("room"),

        ;

        private final String value;

        RoomDetailsEnum(String value) {
            this.value = value;
        }
    }

    @Getter
    public enum StatusResponseEnum{
        SUCCESS("success"),
        FAILED("failed")
        ;
        private final String value;


        StatusResponseEnum(String value) {
            this.value=value;
        }
    }

    @Getter
    public enum PromotionsEnum {
        LIST_PROMOTIONS("listPromotions"),
        PROMOTION_DESCRIPTION("promotion_description"),
        PROMOTION_TITLE("promotion_title"),

        IS_DEACTIVATED("is_deactivated"),
        PROMOTION_ID("promotion_id"),
        MINIMUM_DAYS_OF_STAY("minimum_days_of_stay"),

        PRICE_FACTOR("price_factor");

        private final String value;

        PromotionsEnum(String value) {
            this.value = value;
        }
    }

    @Getter
    public enum QueryEnum {
        DATA("data"),
        LIST_ROOM_RATES("listRoomRates"),
        LIST_ROOM_TYPES("listRoomTypes"),

        DATE("date"),
        LIST_ROOM_AVAILABILITIES("listRoomAvailabilities");

        private final String value;

        QueryEnum(String value) {
            this.value = value;
        }
    }
    @Getter
    public enum DiscountsEnum {
        SENIOR_CITIZEN_DISCOUNT("SENIOR_CITIZEN_DISCOUNT"),
        WEEK_DISCOUNT("WEEK_DISCOUNT"),
        MILITARY_PERSONNEL_DISCOUNT("MILITARY_PERSONNEL_DISCOUNT"),
        FAMILYTIME_DISCOUNT("FAMILYTIME_DISCOUNT"),

        KDU_MEMBERSHIP_DISCOUNT("KDU_MEMBERSHIP_DISCOUNT"),
        DISABLED_DISCOUNT("DISABLED_DISCOUNT"),
        LONG_WEEKEND_DISCOUNT("LONG_WEEKEND_DISCOUNT"),

        WEEKEND_DISCOUNT("WEEKEND_DISCOUNT"),
        WEEKDAYS_DISCOUNT("WEEKDAYS_DISCOUNT"),
        UPFRONT_PAYMENT_DISCOUNT("UPFRONT_PAYMENT_DISCOUNT"),

        ALL_WEEKEND_CHECK("allWeekend"),
        ANY_WEEKEND_CHECK("anyWeekend");

        private final String value;

        DiscountsEnum(String value) {
            this.value = value;
        }
    }
    @Getter
    public enum ErrorMessageEnum{

        PROMO_CONDITIONS_ERROR("PromoCode conditions not met."),
        INVALID_PROMO_CODE("Invalid Promo-code"),
        UNEXPECTED_ERROR("An unexpected error occurred"),
        API_PRICE_RETRIEVE_ERROR("Failed to retrieve room rate break down from the API"),
        API_ROOM_RETRIEVE_ERROR("Failed to retrieve available rooms from the API"),
        USER_NOT_FOUND("User not found with id: "),
        INVALID_ATTRIBUTE("Invalid attribute: "),
        INVALID_DATE("Invalid date format. Dates should be in yyyy-mm-dd format."),
        INVALID_DATE_RANGE("Start date cannot be after end date."),
        ROOM_NOT_FOUND("No room found for room type: "),
        INVALID_BOOKING_ID("Invalid Booking ID"),
        RATING_EXIST("Rating already provided.")
        ;
        private final String value;

        ErrorMessageEnum(String value) {
            this.value = value;
        }
    }

    @Getter
    public enum RatingsEnum{

        FEEDBACK_SUCCESS("Thank you for your feedback."),
        SENDER_EMAIL("naman.singh@kickdrumtech.com"),
        EMAIL_SUBJECT("Please provide a feedback"),
        ;
        private final String value;

        RatingsEnum(String value) {
            this.value = value;
        }
    }
    @Getter
    public enum SesEnum{

        UTF_8("UTF-8"),
        ALTERNATIVE("alternative"),
        CONTENT_TEXT("text/plain; charset=UTF-8"),
        CONTENT_HTML("text/html; charset=UTF-8"),
        MIXED("mixed"),
        EMAIL_SENT("Email message Sent To : "),

        HTML_BODY("<!doctype html>\n" +
                "<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n" +
                "\n" +
                "<head>\n" +
                "  <title>\n" +
                "  </title>\n" +
                "  <!--[if !mso]><!-->\n" +
                "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
                "  <!--<![endif]-->\n" +
                "  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n" +
                "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
                "  <style type=\"text/css\">\n" +
                "    #outlook a {\n" +
                "      padding: 0;\n" +
                "    }\n" +
                "\n" +
                "    body {\n" +
                "      margin: 0;\n" +
                "      padding: 0;\n" +
                "      -webkit-text-size-adjust: 100%%;\n" +
                "      -ms-text-size-adjust: 100%%;\n" +
                "    }\n" +
                "\n" +
                "    table,\n" +
                "    td {\n" +
                "      border-collapse: collapse;\n" +
                "      mso-table-lspace: 0pt;\n" +
                "      mso-table-rspace: 0pt;\n" +
                "    }\n" +
                "\n" +
                "    img {\n" +
                "      border: 0;\n" +
                "      height: auto;\n" +
                "      line-height: 100%%;\n" +
                "      outline: none;\n" +
                "      text-decoration: none;\n" +
                "      -ms-interpolation-mode: bicubic;\n" +
                "    }\n" +
                "\n" +
                "    p {\n" +
                "      display: block;\n" +
                "      margin: 13px 0;\n" +
                "    }\n" +
                "  </style>\n" +
                "  <!--[if mso]>\n" +
                "        <noscript>\n" +
                "        <xml>\n" +
                "        <o:OfficeDocumentSettings>\n" +
                "          <o:AllowPNG/>\n" +
                "          <o:PixelsPerInch>96</o:PixelsPerInch>\n" +
                "        </o:OfficeDocumentSettings>\n" +
                "        </xml>\n" +
                "        </noscript>\n" +
                "        <![endif]-->\n" +
                "  <!--[if lte mso 11]>\n" +
                "        <style type=\"text/css\">\n" +
                "          .mj-outlook-group-fix { width:100%% !important; }\n" +
                "        </style>\n" +
                "        <![endif]-->\n" +
                "  <!--[if !mso]><!-->\n" +
                "  <link href=\"https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700\" rel=\"stylesheet\" type=\"text/css\">\n" +
                "  <style type=\"text/css\">\n" +
                "    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);\n" +
                "  </style>\n" +
                "  <!--<![endif]-->\n" +
                "  <style type=\"text/css\">\n" +
                "    @media only screen and (min-width:480px) {\n" +
                "      .mj-column-per-100 {\n" +
                "        width: 100%% !important;\n" +
                "        max-width: 100%%;\n" +
                "      }\n" +
                "    }\n" +
                "  </style>\n" +
                "  <style media=\"screen and (min-width:480px)\">\n" +
                "    .moz-text-html .mj-column-per-100 {\n" +
                "      width: 100%% !important;\n" +
                "      max-width: 100%%;\n" +
                "    }\n" +
                "  </style>\n" +
                "  <style type=\"text/css\">\n" +
                "  </style>\n" +
                "</head>\n" +
                "\n" +
                "<body style=\"word-spacing:normal;\">\n" +
                "  <div style=\"\">\n" +
                "    <!--[if mso | IE]><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"\" style=\"width:600px;\" width=\"600\" ><tr><td style=\"line-height:0px;font-size:0px;mso-line-height-rule:exactly;\"><![endif]-->\n" +
                "    <div style=\"margin:0px auto;max-width:600px;\">\n" +
                "      <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"width:100%%;\">\n" +
                "        <tbody>\n" +
                "          <tr>\n" +
                "            <td style=\"direction:ltr;font-size:0px;padding:20px 0;text-align:center;\">\n" +
                "              <!--[if mso | IE]><table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td class=\"\" style=\"vertical-align:top;width:600px;\" ><![endif]-->\n" +
                "              <div class=\"mj-column-per-100 mj-outlook-group-fix\" style=\"font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%%;\">\n" +
                "                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"vertical-align:top;\" width=\"100%%\">\n" +
                "                  <tbody>\n" +
                "                    <tr>\n" +
                "                      <td align=\"left\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n" +
                "                        <div style=\"font-family:helvetica;font-size:20px;line-height:1;text-align:left;color:#006400;\">Hello Traveller!!!</div>\n" +
                "                      </td>\n" +
                "                    </tr>\n" +
                "                    <tr>\n" +
                "                      <td align=\"center\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n" +
                "                        <p style=\"border-top:solid 4px #006400;font-size:1px;margin:0px auto;width:100%%;\">\n" +
                "                        </p>\n" +
                "                        <!--[if mso | IE]><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-top:solid 4px #006400;font-size:1px;margin:0px auto;width:550px;\" role=\"presentation\" width=\"550px\" ><tr><td style=\"height:0;line-height:0;\"> &nbsp;\n" +
                "</td></tr></table><![endif]-->\n" +
                "                      </td>\n" +
                "                    </tr>\n" +
                "                    <tr>\n" +
                "                      <td align=\"left\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n" +
                "                        <div style=\"font-family:helvetica;font-size:16px;line-height:1;text-align:left;color:#006400;\">We hope this email finds you well. On behalf of our entire team, we would like to express our sincerest gratitude for choosing our hotel for your recent stay. We are delighted to know that you had a wonderful trip and that we were able to make your experience a memorable one.</div>\n" +
                "                      </td>\n" +
                "                    </tr>\n" +
                "                    <tr>\n" +
                "                      <td align=\"left\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n" +
                "                        <div style=\"font-family:helvetica;font-size:16px;line-height:1;text-align:left;color:#006400;\">As part of our continuous effort to improve our services, we kindly ask you to share your feedback with us by clicking on the link below. Your honest opinion is valuable to us and will help us to better understand our guests' needs and preferences.</div>\n" +
                "                      </td>\n" +
                "                    </tr>\n" +
                "                    <tr>\n" +
                "                      <td  style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n" +
                "                        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"border-collapse:separate;line-height:100%%;\">\n" +
                "                          <tr>\n" +
                "                            <td align=\"center\" bgcolor=\"#000080\" role=\"presentation\" style=\"border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#000080;\" valign=\"middle\">\n" +
                "                              <a href=\"https://d2p77bhpp2u8y8.cloudfront.net/ratings?bookingId=%s\" style=\"display:inline-block;background:#000080;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;\"> Give Rating </a>\n" +
                "                            </td>\n" +
                "                          </tr>\n" +
                "                        </table>\n" +
                "                      </td>\n" +
                "                    </tr>\n" +
                "                    <tr>\n" +
                "                      <td align=\"left\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n" +
                "                        <div style=\"font-family:helvetica;font-size:16px;line-height:1;text-align:left;color:#006400;\">Thank you for taking the time to complete the survey. We appreciate your input and look forward to welcoming you back to our hotel in the near future. Warm regards,</div>\n" +
                "                      </td>\n" +
                "                    </tr>\n" +
                "                    <tr>\n" +
                "                      <td align=\"left\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\">\n" +
                "                        <div style=\"font-family:helvetica;font-size:20px;line-height:1;text-align:left;color:#006400;\">Kickdrum Booking Engine- Property-3</div>\n" +
                "                      </td>\n" +
                "                    </tr>\n" +
                "                  </tbody>\n" +
                "                </table>\n" +
                "              </div>\n" +
                "              <!--[if mso | IE]></td></tr></table><![endif]-->\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody>\n" +
                "      </table>\n" +
                "    </div>\n" +
                "    <!--[if mso | IE]></td></tr></table><![endif]-->\n" +
                "  </div>\n" +
                "</body>\n" +
                "\n" +
                "</html>")
        ;
        private final String value;

        SesEnum(String value) {
            this.value = value;
        }
    }
}
