package com.example.team3backend.service;
import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.model.DeleteMessageRequest;
import com.amazonaws.services.sqs.model.SendMessageRequest;
import com.example.team3backend.configuration.AmazonSqsClient;
import com.example.team3backend.dto.QueueBookingRequestDto;
import com.example.team3backend.dto.QueueBookingResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class QueueService {

        @Autowired
        AmazonSQS sqs;
        @Autowired
        AmazonSqsClient amazonSqsClient;
        @Autowired
        private SpecialOffersEmailService specialOffersEmailService;

        public ResponseEntity<QueueBookingResponse> sendMessageToQueue(QueueBookingRequestDto queueBookingRequestDto) {
            ObjectMapper objectMapper = new ObjectMapper();
            String queueUrl= amazonSqsClient.getSqsUrl();
            String groupId = String.valueOf(Math.random()*1000);

            try {
                String messageBody = objectMapper.writeValueAsString(queueBookingRequestDto);
                SendMessageRequest send_msg_request = new SendMessageRequest()
                        .withQueueUrl(queueUrl)
                        .withMessageBody(messageBody)
                        .withMessageGroupId(groupId);
                sqs.sendMessage(send_msg_request);

                if(queueBookingRequestDto.getSend_special_offer())
                {
                    specialOffersEmailService.saveEmail(queueBookingRequestDto.getEmail());
                }

                QueueBookingResponse queueBookingResponse = new QueueBookingResponse(queueBookingRequestDto.getBooking_id());

                return new ResponseEntity<>(queueBookingResponse, HttpStatus.OK);
            } catch ( JsonProcessingException e) {
                // handle the exception as appropriate for your use case
                log.error("Error serializing message body: " + e.getMessage());
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

}

