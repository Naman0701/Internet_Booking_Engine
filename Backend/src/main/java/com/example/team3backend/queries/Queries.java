package com.example.team3backend.queries;

import lombok.Getter;
import org.springframework.stereotype.Component;

@Component
@Getter
public class Queries {
    private final String defaultPromotions="query MyQuery {\n" +
            "        listPromotions {\n" +
            "        is_deactivated\n" +
            "        minimum_days_of_stay\n" +
            "        price_factor\n" +
            "        promotion_description\n" +
            "        promotion_id\n" +
            "        promotion_title\n" +
            "        }\n" +
            "        }";

    private final String minimumNightlyRateQuery="query MyQuery {\n" +
            "  listRoomTypes(where: {property_id: {equals: 3}, room_rates: {some: {room_rate: {date: {gte: \"2023-03-01T00:00:00.000Z\", lte: \"2023-05-31T00:00:00.000Z\"}}}}}, take: %s, skip: %s) {\n" +
            "    room_rates {\n" +
            "      room_rate {\n" +
            "        basic_nightly_rate\n" +
            "        date\n" +
            "      }\n" +
            "    }\n" +
            "    property_id\n" +
            "  }\n" +
            "}\n";

    private final String rateBetweenDateRangeQuery="query MyQuery {\n" +
            " listRoomRates(where: {date: {gte: \"%s\", lte: \"%s\"}, AND: {room_types: {some: {room_type: {property_id: {equals: %d}}}}}}, take: 1000) {\n" +
            " basic_nightly_rate\n" +
            " room_types {\n" +
            " room_type {\n" +
            " property_id\n" +
            " room_type_name\n" +
            " }\n" +
            " }\n" +
            " }\n" +
            "}";

    private final String searchResultsQuery="query MyQuery {\n" +
            " listRoomAvailabilities(where: {property_id: {equals: %d}, date: {gte: \"%s\", lte: \"%s\"}, booking_id: {equals: 0}}, take: 1000) {\n" +
            " date\n" +
            " room_id\n" +
            " room {\n" +
            " room_type {\n" +
            " room_type_name\n" +
            " single_bed\n" +
            " room_type_id\n" +
            " max_capacity\n" +
            " double_bed\n" +
            " area_in_square_feet\n" +
            " }\n" +
            " }\n" +
            " }\n" +
            "}";

    private final String roomRatesBreakDown="query MyQuery {\n" +
            "  listRoomTypes(where: {property_id: {equals: %d}}, skip: %d, take: %d) {\n" +
            "    room_type_name\n" +
            "    room_rates {\n" +
            "      room_rate {\n" +
            "        basic_nightly_rate\n" +
            "        date\n" +
            "      }\n" +
            "    }\n" +
            "  }\n" +
            "}\n";
}
