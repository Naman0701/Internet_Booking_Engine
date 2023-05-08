package com.example.team3backend.configuration;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class ApplicationPropertiesConfiguration {

    @Value("${spring.database.manager}")
    private String rdsManager;

    @Value("${spring.graphQl.manager}")
    private String apiManager;
}
