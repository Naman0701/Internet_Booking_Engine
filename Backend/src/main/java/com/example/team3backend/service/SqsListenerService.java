package com.example.team3backend.service;

import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
import com.amazonaws.services.sqs.model.DeleteMessageRequest;
import com.amazonaws.services.sqs.model.ReceiptHandleIsInvalidException;
import com.example.team3backend.configuration.AmazonSqsClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.aws.messaging.listener.SqsMessageDeletionPolicy;
import org.springframework.cloud.aws.messaging.listener.annotation.SqsListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
@Slf4j
public class SqsListenerService {

    @Autowired
    AmazonSQS sqs;
    @Autowired
    RoomAvailabilityService roomAvailabilityService;
    @Autowired
    AmazonSqsClient amazonSqsClient;
    @Autowired
    BookingService bookingService;
    @Autowired
    RoomTypeAvailabilityTableService roomTypeAvailabilityTableService;

    @SqsListener(value = "Team-3-SQS.fifo", deletionPolicy = SqsMessageDeletionPolicy.ALWAYS)
    public void listen(String messageBody, @Header("ReceiptHandle") String receiptHandle) {


        List<Integer> roomIdsAvailableForBooking = roomAvailabilityService.isRoomCountAvailableForBooking(messageBody);

        //check for availability of number of rooms
        boolean isBookingFailed = bookingService.checkForFailedBooking(messageBody, roomIdsAvailableForBooking);

        if (isBookingFailed) {
            AmazonSQS sqs = AmazonSQSClientBuilder.defaultClient();
            try {
                sqs.deleteMessage(new DeleteMessageRequest()
                        .withQueueUrl(amazonSqsClient.getSqsUrl())
                        .withReceiptHandle(receiptHandle));
            } catch (ReceiptHandleIsInvalidException e) {
                // Log an error message and handle the exception as appropriate for your use case
                log.error("Error deleting message with receipt handle " + receiptHandle + ": " + e.getMessage());
            }
        }
        //check for concurrency
        else {
            boolean canBeBookedNow = roomAvailabilityService.checkOverLappingDate(messageBody, roomIdsAvailableForBooking);
            log.info("can be booked");
            log.info(String.valueOf(canBeBookedNow));
            if(canBeBookedNow) {
                bookingService.createBooking(messageBody, roomIdsAvailableForBooking);
                roomTypeAvailabilityTableService.deleteDateRangeFromRoomType(messageBody);
                AmazonSQS sqs = AmazonSQSClientBuilder.defaultClient();
                try {
                    sqs.deleteMessage(new DeleteMessageRequest()
                            .withQueueUrl(amazonSqsClient.getSqsUrl())
                            .withReceiptHandle(receiptHandle));
                } catch (ReceiptHandleIsInvalidException e) {
                    // Log an error message and handle the exception as appropriate for your use case
                    log.error("Error deleting message with receipt handle " + receiptHandle + ": " + e.getMessage());
                }
            }
        }
    }
}


