package com.vu.aezakmi.config;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ConfigurationRefresher {

    private  boolean loggingInterceptorEnabled;

    public ConfigurationRefresher() {
        refreshConfiguration();
    }

    @Scheduled(fixedRate = 60000)
    public void refreshConfiguration() {
        String isEnabled = System.getenv("LOGGING_INTERCEPTOR_ENABLED");
        loggingInterceptorEnabled = isEnabled != null && isEnabled.equalsIgnoreCase("true");
    }

    public boolean isLoggingInterceptorEnabled() {
        return loggingInterceptorEnabled;
    }
}
