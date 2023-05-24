package com.vu.aezakmi.utils;

import com.vu.aezakmi.config.ConfigurationRefresher;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Collectors;

@Component("debugRequestLoggingStrategy")
public class DebugLogger implements LoggerStrategy {
    @Override
    public Optional<String> createLogMessage(HttpServletRequest request, HttpServletResponse response, Object handler, ConfigurationRefresher configurationRefresher) {
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

            String stackTrace = Arrays.stream(Thread.currentThread().getStackTrace())
                    .map(Object::toString)
                    .collect(Collectors.joining(", "));


            String logMessage = String.format("DEBUG LOG: Timestamp: %s | Request URL: %s | Method: %s | Class Name: %s | Method Name: %s | User: %s | Permissions: %s | Stack trace: %s",
                    timestamp, requestURL, method, className, methodName, user, permissions, stackTrace);
            return Optional.of(logMessage);
        }
        return Optional.empty();
    }
    
    @Override
    public void writeToFile(Optional<String> log) {
        if (log.isPresent()){
            try (PrintWriter writer = new PrintWriter(new FileWriter("logs.txt", true))) {
                writer.println(log.get());
            } catch (IOException e) {
                System.out.println("Appending log failed");
            }
        }
    }
}
