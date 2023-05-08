package com.example.team3backend.configuration;

import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.awscore.AwsRequestOverrideConfiguration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.ses.SesClient;


@Configuration
public class ClientConfiguration {
    public SecretsManagerClient getSecretManagerClient(){
        return SecretsManagerClient.builder()
                .region(Region.AP_SOUTH_1)
                .build();
    }
    public SesClient getSesManagerClient(){
         return SesClient.builder()
                .region(Region.AP_SOUTH_1)
                .build();
    }
    public AwsRequestOverrideConfiguration getAwsRequestOverrideConfiguration(){
        return AwsRequestOverrideConfiguration.builder()
                .build() ;
    }
}
