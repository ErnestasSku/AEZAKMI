package com.vu.aezakmi;

import com.vu.aezakmi.config.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication

public class AezakmiApplication {

    public static void main(String[] args) {
        SpringApplication.run(AezakmiApplication.class, args);
    }

}
