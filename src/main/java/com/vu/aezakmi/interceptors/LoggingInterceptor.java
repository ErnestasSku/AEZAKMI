package com.vu.aezakmi.interceptors;


import com.nimbusds.jose.proc.SecurityContext;
import com.vu.aezakmi.config.ConfigurationRefresher;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import java.util.stream.Collectors;

@Component
public class LoggingInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(LoggingInterceptor.class);
    private final ConfigurationRefresher configurationRefresher;

    public LoggingInterceptor(ConfigurationRefresher configurationRefresher) {
        this.configurationRefresher = configurationRefresher;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (configurationRefresher.isLoggingInterceptorEnabled()) {

            LocalDateTime timestamp = LocalDateTime.now();
            String requestURL = request.getRequestURL().toString();
            String method = request.getMethod();
            String user = request.getUserPrincipal() != null ?
                    request.getUserPrincipal().getName() :
                    "anonymous";

            String permissions = "N/A";
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                permissions = userDetails.getAuthorities().stream()
                        .map(Object::toString)
                        .collect(Collectors.joining(", "));
            }

            String className = handler.getClass().getName();
            String methodName = ((HandlerMethod)handler).getMethod().getName();

            String logMessage = String.format("Timestamp: %s | Request URL: %s | Method: %s | Class Name: %s | Method Name: %s | User: %s | Permissions: %s",
                    timestamp, requestURL, method, className, methodName, user, permissions);

            System.out.println(logMessage);
            writeLogToFile(logMessage);
        }
        return true;
    }

    private void writeLogToFile(String logMessage) {
        try (PrintWriter writer = new PrintWriter(new FileWriter("logs.txt", true))) {
            writer.println(logMessage);
        } catch (IOException e) {
            logger.error("Failed to write log to file", e);
        }
    }

}
