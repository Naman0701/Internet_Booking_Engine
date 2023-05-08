package com.example.team3backend.configuration;

import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import software.amazon.awssdk.services.lightsail.model.RegionName;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;
import software.amazon.awssdk.services.secretsmanager.model.SecretsManagerException;

@Configuration
public class AmazonSqsClient {

    @Autowired
    ApplicationPropertiesConfiguration applicationPropertiesConfiguration;

    @Autowired
    ClientConfiguration clientConfiguration;

    @Primary
    @Bean
    public AmazonSQS sqsClient() {
        return AmazonSQSClientBuilder
                .standard()
                .withRegion(RegionName.AP_SOUTH_1.toString())
                .build();
    }

    public String getSqsUrl() {
        try {
            GetSecretValueRequest valueRequest = GetSecretValueRequest.builder()
                    .secretId(applicationPropertiesConfiguration.getApiManager())
                    .build();
            GetSecretValueResponse valueResponse = clientConfiguration.getSecretManagerClient().getSecretValue(valueRequest);
            String secretString=valueResponse.secretString();

            Gson gson = new GsonBuilder().create();

            JsonObject jsonObject = gson.fromJson(secretString, JsonObject.class);

            String sqsUrl=jsonObject.get("sqs-link").getAsString();
            return  sqsUrl;
        }
        catch (SecretsManagerException e) {
            System.err.println(e.awsErrorDetails().errorMessage());
            System.exit(1);
        }
        return  null;
    }

}