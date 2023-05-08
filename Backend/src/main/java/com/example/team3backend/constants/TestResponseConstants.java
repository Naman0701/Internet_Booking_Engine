package com.example.team3backend.constants;

import lombok.Getter;
import org.springframework.stereotype.Component;

@Component
public class TestResponseConstants {

    public final String minimumNightlyRateResponse="{\"data\": {\"listRoomTypes\": [{\"room_rates\": [{\"room_rate\": {\"date\": \"2022-03-22T00:00:00.000Z\", \"basic_nightly_rate\": 100}}, {\"room_rate\": {\"date\": \"2022-03-23T00:00:00.000Z\", \"basic_nightly_rate\": 150}}]}, {\"room_rates\": [{\"room_rate\": {\"date\": \"2022-03-22T00:00:00.000Z\", \"basic_nightly_rate\": 120}}, {\"room_rate\": {\"date\": \"2022-03-23T00:00:00.000Z\", \"basic_nightly_rate\": 180}}]}]}}";

    public final String minimumNightlyRateEmptyResponse=null;

    public final String minimumNightlyRatesInvalidResponse="{\"data\": {\"listRoomTypes\": [{\"room_rates\": [{\"room_rate\": {\"date\": \"2022-03-22T00:00:00.000Z\", \"basic_nightly_rate\": 100}}, {\"room_rate\": {\"date\": \"2022-03-23T00:00:00.000Z\", \"basic_nightly_rate\": 150}}]}, {\"room_rates\": [{\"room_rate\": {\"date\": \"2022-03-22T00:00:00.000Z\", \"basic_nightly_rate\": 120}}, {\"room_rate\": {\"date\": \"2022-03-23T00:00:00.000Z\", \"basic_nightly_rate\": 180}}]}]}}\"";
}
