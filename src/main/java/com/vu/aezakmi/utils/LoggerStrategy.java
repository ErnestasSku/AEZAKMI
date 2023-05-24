package com.vu.aezakmi.utils;

import com.vu.aezakmi.config.ConfigurationRefresher;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Optional;

public interface LoggerStrategy {
    Optional<String> createLogMessage(HttpServletRequest request, HttpServletResponse response, Object handler, ConfigurationRefresher configurationRefresher);
    void writeToFile(Optional<String> log);
}
