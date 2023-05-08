package com.example.team3backend.utility;

import com.example.team3backend.dto.QueueBookingRequestDto;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.utils.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class QueueBookingRequestValidator {

    public static List<String> validateQueueBookingRequest(QueueBookingRequestDto requestDto) {
        List<String> errors = new ArrayList<>();

        if (StringUtils.isBlank(requestDto.getFirst_name())) {
            errors.add("First name can't be empty");
        }

        if (StringUtils.isBlank(requestDto.getLast_name())) {
            errors.add("Last name can't be empty");
        }

        if (StringUtils.isBlank(requestDto.getMailing_address1())) {
            errors.add("Primary Mailing Address can't be empty");
        }

        if (StringUtils.isBlank(requestDto.getCity())) {
            errors.add("City can't be empty");
        }

        String phonePattern = "^\\d{10}$";
        if (!Pattern.matches(phonePattern, requestDto.getPhone())) {
            errors.add("Please enter a valid 10-digit phone number");
        }

        String zipPattern = "^\\d{6}$";
        if (!Pattern.matches(zipPattern, requestDto.getZip())) {
            errors.add("Please enter a valid 6-digit pin code");
        }

        String emailPattern = "^\\S+@\\S+\\.\\S+$";
        if (!Pattern.matches(emailPattern, requestDto.getEmail())) {
            errors.add("Please enter a valid email");
        }

        String cardNumberPattern = "^\\d{16}$";
        if (!Pattern.matches(cardNumberPattern, requestDto.getCard_number())) {
            errors.add("Please enter valid 16-digit card number.");
        }


        return errors;
    }

}
