package com.example.team3backend.configuration;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;
import software.amazon.awssdk.services.secretsmanager.model.SecretsManagerException;
import javax.sql.DataSource;

@Configuration
@Slf4j
public class DatabaseConfiguration {


    @Autowired
    ClientConfiguration clientConfiguration;

    @Autowired
    ApplicationPropertiesConfiguration applicationPropertiesConfiguration;

    @Bean
    public DataSource getSecretValue(){


        try {
            GetSecretValueRequest valueRequest = GetSecretValueRequest.builder()
                    .secretId(applicationPropertiesConfiguration.getRdsManager())
                    .build();

            GetSecretValueResponse valueResponse = clientConfiguration.getSecretManagerClient().getSecretValue(valueRequest);
            String secretString = valueResponse.secretString();

            Gson gson = new GsonBuilder().create();

            JsonObject jsonObject = gson.fromJson(secretString, JsonObject.class);
            String username = jsonObject.get("username").getAsString();
            String password = jsonObject.get("password").getAsString();

            String dbUrl  = jsonObject.get("dbUrl").getAsString();
            String driver= jsonObject.get("driver").getAsString();

            DriverManagerDataSource dataSource = new DriverManagerDataSource();

            dataSource.setUrl(dbUrl);
            dataSource.setUsername(username);
            dataSource.setPassword(password);
            dataSource.setDriverClassName(driver);

            return dataSource;

        }

        catch (SecretsManagerException e) {
            System.err.println(e.awsErrorDetails().errorMessage());
            System.exit(1);
        }

        return null;
    }
}