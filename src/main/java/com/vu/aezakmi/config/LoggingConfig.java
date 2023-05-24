package com.vu.aezakmi.config;

import com.vu.aezakmi.utils.DebugLogger;
import com.vu.aezakmi.utils.Logger;
import com.vu.aezakmi.utils.LoggerStrategy;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties(prefix = "app.logging")
public class LoggingConfig {
    private String type;

    public void setType(String type) {
        this.type = type;
    }

    public LoggerStrategy getLoggerStrategy() {

        System.out.println("Type is: " + type);
            
        if (type.equals("debug")) {
            return debugLoggerStrategy();
        } else {
            return defaultLoggingStrategy();
        }
    }

    @Bean
    public Logger defaultLoggingStrategy() {
        return new Logger();
    }

    @Bean
    public DebugLogger debugLoggerStrategy() {
        return new DebugLogger();
    }
}
