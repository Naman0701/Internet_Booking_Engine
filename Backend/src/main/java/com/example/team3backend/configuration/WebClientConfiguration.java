package com.example.team3backend.configuration;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;
import software.amazon.awssdk.services.secretsmanager.model.SecretsManagerException;

import java.nio.charset.StandardCharsets;
import java.util.Map;

@Configuration
@Slf4j
@Getter

public class WebClientConfiguration {


    @Autowired
    private
    ClientConfiguration clientConfiguration;
    @Autowired
    private
    ApplicationPropertiesConfiguration applicationPropertiesConfiguration;
    private final int size=16*1024*1024;
    private  final ExchangeStrategies strategies = ExchangeStrategies.builder()
            .codecs(codecs -> codecs.defaultCodecs().maxInMemorySize(size))
            .build();


    public  WebClient getWebClient() {
        try {

            GetSecretValueRequest valueRequest = GetSecretValueRequest.builder()
                    .secretId(applicationPropertiesConfiguration.getApiManager())
                    .build();

            GetSecretValueResponse valueResponse = clientConfiguration.getSecretManagerClient().getSecretValue(valueRequest);

            String secretString=valueResponse.secretString();

            Gson gson = new GsonBuilder().create();

            JsonObject jsonObject = gson.fromJson(secretString, JsonObject.class);

            return WebClient.builder()
                    .exchangeStrategies(strategies)
                    .baseUrl(jsonObject.get("graph-ql-api-link").getAsString())
                    .defaultHeader("x-api-key", jsonObject.get("graph-ql-api-key").getAsString())
                    .build();
        }

        catch (SecretsManagerException e) {
            System.err.println(e.awsErrorDetails().errorMessage());
            System.exit(1);
        }
        return  null;
    }
    public  WebClient.RequestHeadersSpec<?> prepareRequest(String query) {
        return getWebClient().method(HttpMethod.POST)
                .uri("/graphql")
                .bodyValue(Map.of("query", query))
                .accept(MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML)
                .acceptCharset(StandardCharsets.UTF_8);
    }
}
