package com.vu.aezakmi.interceptors;


import com.nimbusds.jose.proc.SecurityContext;
import com.vu.aezakmi.config.ConfigurationRefresher;
import com.vu.aezakmi.config.LoggingConfig;
import com.vu.aezakmi.utils.LoggerStrategy;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class LoggingInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(LoggingInterceptor.class);
    private final ConfigurationRefresher configurationRefresher;

    private LoggerStrategy loggerStrategy;


    public LoggingInterceptor(ConfigurationRefresher configurationRefresher, LoggingConfig loggingConfig) {
        this.configurationRefresher = configurationRefresher;
        this.loggerStrategy = loggingConfig.getLoggerStrategy();

    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        Optional<String> log = loggerStrategy.createLogMessage(request, response, handler, configurationRefresher);
        loggerStrategy.writeToFile(log);
        return true;
    }


}
