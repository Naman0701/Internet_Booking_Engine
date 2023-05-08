package com.example.team3backend.utility;

import com.example.team3backend.dto.BookingDetailsDto;
import com.example.team3backend.dto.PriceBreakDownRequestDto;
import com.example.team3backend.dto.QueueBookingRequestDto;
import com.example.team3backend.entity.BookingDetails;
import com.example.team3backend.service.PriceBreakDownService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class BookingUtil {

    @Autowired
    private PriceBreakDownService priceBreakDownService;
    public BookingDetailsDto mapToBookingDetailsDto(BookingDetails bookingDetails) {

        BookingDetailsDto bookingDetailsDto = new BookingDetailsDto();
        bookingDetailsDto.setBookingId(bookingDetails.getBookingId());
        bookingDetailsDto.setFirstName(bookingDetails.getFirstName());
        bookingDetailsDto.setLastName(bookingDetails.getLastName());
        bookingDetailsDto.setPhone(bookingDetails.getPhone());
        bookingDetailsDto.setEmail(bookingDetails.getEmail());
        bookingDetailsDto.setCardNumber(bookingDetails.getCardNumber());
        bookingDetailsDto.setPropertyId(bookingDetails.getPropertyId());
        bookingDetailsDto.setCheckInDate(bookingDetails.getCheckInDate());
        bookingDetailsDto.setCheckOutDate(bookingDetails.getCheckOutDate());
        bookingDetailsDto.setGuests(bookingDetails.getGuests());
        bookingDetailsDto.setPromoTitle(bookingDetails.getPromoTitle());
        bookingDetailsDto.setPromoDescription(bookingDetails.getPromoDescription());
        bookingDetailsDto.setNightlyRate(bookingDetails.getNightlyRate());
        bookingDetailsDto.setSubtotal(bookingDetails.getSubtotal());
        bookingDetailsDto.setTaxes(bookingDetails.getTaxes());
        bookingDetailsDto.setVat(bookingDetails.getVat());
        bookingDetailsDto.setTotalForStay(bookingDetails.getTotalForStay());
        bookingDetailsDto.setRoomType(bookingDetails.getRoomType());
        bookingDetailsDto.setMailingAddress1(bookingDetails.getMailingAddress1());
        bookingDetailsDto.setCountry(bookingDetails.getCountry());
        bookingDetailsDto.setState(bookingDetails.getState());
        bookingDetailsDto.setZip(bookingDetails.getZip());
        bookingDetailsDto.setRoomCount(bookingDetails.getRoomCount());
        bookingDetailsDto.setIsDeleted(bookingDetails.getIsDeleted());

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            List<String> roomList = objectMapper.readValue(bookingDetails.getRoomsList(), new TypeReference<List<String>>(){});
            bookingDetailsDto.setRoomsList(roomList);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return bookingDetailsDto;
    }

    public BookingDetails mapToBookingDetails(QueueBookingRequestDto bookingRequestDto)
    {
        BookingDetails bookingDetails=new BookingDetails();
        bookingDetails.setUserId(bookingRequestDto.getUser_id());
        bookingDetails.setBookingId(bookingRequestDto.getBooking_id());
        bookingDetails.setFirstName(bookingRequestDto.getFirst_name());
        bookingDetails.setLastName(bookingRequestDto.getLast_name());
        bookingDetails.setPhone(bookingRequestDto.getPhone());
        bookingDetails.setEmail(bookingRequestDto.getEmail());
        bookingDetails.setCardNumber(bookingRequestDto.getCard_number());
        bookingDetails.setPropertyId(bookingRequestDto.getProperty_id());
        bookingDetails.setCheckInDate(bookingRequestDto.getCheck_in_date());
        bookingDetails.setCheckOutDate(bookingRequestDto.getCheck_out_date());
        bookingDetails.setGuests(bookingRequestDto.getGuests());
        bookingDetails.setPromoTitle(bookingRequestDto.getPromo_title());
        bookingDetails.setPromoDescription(bookingRequestDto.getPromo_description());
        bookingDetails.setSubtotal(bookingRequestDto.getSubtotal());
        bookingDetails.setTaxes(bookingRequestDto.getTaxes());
        bookingDetails.setVat(bookingRequestDto.getVat());
        bookingDetails.setTotalForStay(bookingRequestDto.getTotal_for_stay());
        bookingDetails.setRoomType(bookingRequestDto.getRoom_type());
        bookingDetails.setMailingAddress1(bookingRequestDto.getMailing_address1());
        bookingDetails.setCountry(bookingRequestDto.getCountry());
        bookingDetails.setState(bookingRequestDto.getState());
        bookingDetails.setZip(bookingRequestDto.getZip());
        bookingDetails.setRoomCount(bookingRequestDto.getRoom_count());
        bookingDetails.setIsDeleted(false);
        LocalDate startDate = LocalDate.parse(bookingRequestDto.getCheck_in_date(), DateTimeFormatter.ISO_DATE_TIME);
        LocalDate endDate = LocalDate.parse(bookingRequestDto.getCheck_out_date(), DateTimeFormatter.ISO_DATE_TIME);
        long numOfDays = ChronoUnit.DAYS.between(startDate, endDate);
        double totalPrice = Double.parseDouble(bookingRequestDto.getTotal_for_stay());
        double nightlyRate = totalPrice / numOfDays;
        String formattedNightlyRate = String.format("%.2f", nightlyRate);
        bookingDetails.setNightlyRate(formattedNightlyRate);

        return bookingDetails;
    }

    public String generateRandomBookingId() {
        String uuid = UUID.randomUUID().toString();
        return uuid.substring(0, 10);
    }

    public String calculateTotalForStay(String subtotal,String taxes, String vat,String startDate,String endDate,String roomCount,String propertyId,String roomType)
    {
        PriceBreakDownRequestDto priceBreakDownRequestDto=new PriceBreakDownRequestDto(startDate,endDate,Integer.parseInt(roomCount),Integer.parseInt(propertyId),roomType);
        ResponseEntity<Map<LocalDate,Integer>> priceBreakDown= priceBreakDownService.getPriceBreakDown(priceBreakDownRequestDto);
        Map<LocalDate,Integer> priceBreakDownBody=priceBreakDown.getBody();
        int sum = 0;
        if(priceBreakDownBody.size()>0)
        {
            for (Map.Entry<LocalDate, Integer> entry : priceBreakDownBody.entrySet()) {
                sum += entry.getValue();
            }
        }
        Integer totalForStay=Integer.parseInt(subtotal)+Integer.parseInt(taxes)+Integer.parseInt(vat);
        return String.valueOf(totalForStay);
    }


}
